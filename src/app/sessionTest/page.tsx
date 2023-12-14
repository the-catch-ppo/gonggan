import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import LogOutBtn from "../components/LogOutBtn"
import LoginBtn from "../components/LoginBtn"

export default async function SessionTest() {
  let session = await getServerSession(authOptions)
  console.log('session@@@@@@@',session)
  
  return (
    <div>
      세션테스트
      
      
    </div>
  )
}




