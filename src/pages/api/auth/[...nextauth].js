import NextAuth from "next-auth/next";
import KakaoProvider from "next-auth/providers/kakao";
import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";

export const authOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/signin',
    // signOut: '/auth/signout',
    // error: '/nickname', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/oauth' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret : process.env.MONGODB_PASSWORD,
  adapter: MongoDBAdapter(connectDB),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 //30일
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
      
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async jwt({ token, user, account, profile, isNewUser }) {      
      if (user) {
        token.user = {};
        token.user.name = user.name
        token.user.email = user.email
        token.user.image = user.image
        token.user.nickname = user.nickname
        token.user.id = user.id
        token.emailVerified = user.emailVerified
        token.alarm = user.alarm
        token.role = user.role

      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    async session({ session, token }) {
      session.user = token.user;  
      return session;
    },
  }
  
  
  
}

export default NextAuth(authOptions);