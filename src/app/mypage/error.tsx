'use client'

import { useRouter } from "next/navigation";

export default function Error({error, reset}:any){
  const router = useRouter()

  setTimeout(() => {
    router.push('/signin')
  }, 1000);
  return (
    <div className="h-96 flex flex-col justify-center items-center font-bold text-2xl text-sygnature-brown">
      <div>
        세션 오류발생 <br />
        <br /><br />
      </div>

      <div>잠시 후 로그인페이지로 이동합니다.</div>
    </div>
  )
}