import { Session } from 'next-auth'
import Image from "next/image";
import header from '/public/logo2.png'
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth"
import LogOutBtn from "./LogOutBtn";
import LoginBtn from "./LoginBtn";
import { FaBell } from "react-icons/fa";
import HeaderInfo from "./HeaderInfo";
import Link from 'next/link'

export default async function Header() {
  let session: Session | null = await getServerSession(authOptions)

  const handleClick = () => {
    console.log('clicked')
  }
  return (
    <div>
      <div className="flex w-full h-20 bg-sygnature-brown fixed">
      <Link href={'/'}>
        <Image 
          className="mx-1 ml-3 relative"
          src={header}
          width={110}
          height={75}
          alt="header"
        />
      </Link>
      <HeaderInfo session={session} />
        
        
      </div>
      <div className="h-20"></div>
    </div>
  )
}

