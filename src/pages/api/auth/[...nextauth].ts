import NextAuth from "next-auth/next";
import KakaoProvider from "next-auth/providers/kakao";
import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { RequestInternal } from "next-auth";



export const authOptions:any = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        loginId: { label: 'loginId', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials: Record<"loginId" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">): Promise<any> {

        if(!credentials?.loginId || !credentials?.password) {
          throw new Error('Invalid credentials');
        }
        const db = (await connectDB).db("gonggan");
        const user = await db.collection("users").findOne({ loginId: credentials.loginId } );

        if(!user || !user?.password) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if(!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
        
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    // signOut: '/auth/signout',
    // error: '/nickname', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: "/oauth", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: process.env.MONGODB_PASSWORD,
  adapter: MongoDBAdapter(connectDB),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 //30일
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
    // async signIn() {
      return true;
    },
    async redirect({ url, baseUrl }: any) {
      return baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {      
      if (user) {
        token.user = {};
        token.user.name  = user.name;
        token.user.email = user.email;
        token.user.image = user.image;
        token.user.nickname = user.nickname;
        token.user.id = user.id;
        token.emailVerified = user.emailVerified;
        token.alarm = user.alarm;
        token.role = user.role;
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    async session({ session, token }: any) {
      session.user = token.user;
      session.user.role = token.role ? token.role : 'user'
      return session;
    },
  },
};

export default NextAuth(authOptions);
