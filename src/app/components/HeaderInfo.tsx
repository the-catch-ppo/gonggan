'use client'
import React, { useState } from 'react'
import { FaBell } from 'react-icons/fa'
import LoginBtn from './LoginBtn'
import LogOutBtn from './LogOutBtn'
import clsx from 'clsx'
import Link from 'next/link'
import { signIn, signOut } from 'next-auth/react'

// interface Sess {
//   user: {
//     email : string,
//     id : string,
//     image : string,
//     name : string,
//     nickname : string
//   }
// }

const HeaderInfo = ({session} ) => {
  const [isDropboxOpen, setIsDropboxOpen] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  const handleClick = () => {
    setIsAlarmOpen(false)
    setIsDropboxOpen(!isDropboxOpen);
  }

  const handleAlarm = () => {
    setIsDropboxOpen(false)
    setIsAlarmOpen(!isAlarmOpen)
  }

  
  

  return (
    <div>
      {
        
        session 
        // 로그인 상태일 때
        ?
        <div className="absolute right-0 flex items-center px-7 py-3">
          <div className="right-1 flex justify-center items-center">
            <FaBell className="block mx-4 mr-6 text-sygnature-beige cursor-pointer" onClick={handleAlarm} size="30"/>
            <img 
              className="rounded-full h-14 w-14 overflow-hidden cursor-pointer"
              src={session.user.image}
              width={640}
              height={640}
              alt='아이콘'
              onClick={handleClick}
            />

            {/* 알람 아이콘 클릭시 나오는 드랍박스 */}
            <div 
            className={clsx( 
              'bg-sygnature-beige top-20 w-80 h-auto absolute rounded-md text-center flex flex-col items-center justify-center transform -translate-x-24 p-2',
              {
                'visible' : isAlarmOpen === true,
                'hidden' : isAlarmOpen === false
              }
              )}>
              <Link href={'/mypage'} className='hover:font-bold'>마이페이지</Link>
              
              <div className='cursor-pointer hover:font-bold py-1'>등록한 문의 내용 답변</div>
              <div className='cursor-pointer hover:font-bold py-1'>hi님이 내 리뷰에 좋아요를 눌렀습니다.</div>
              <div className='cursor-pointer hover:font-bold py-1'>교촌허니콤보 교촌허니콤보 교촌허니콤보 교촌허니콤보 교촌허니콤보 교촌허니콤보 </div>
              <div className='cursor-pointer hover:font-bold py-1'>hello님이 내 리뷰에 좋아요를 눌렀습니다.</div>

              <div className="absolute bottom-full left-1/2 transform translate-x-14 w-0 h-0 border-solid border-8 border-transparent border-b-sygnature-beige"></div>
            </div>
            
            
            {/* 유저 아이콘 클릭시 나오는 드랍박스 */}
            <div 
            className={clsx(
              'bg-sygnature-beige top-20 w-40 h-auto pt-2 absolute rounded-md text-center flex flex-col items-center justify-center',
              {
                'visible' : isDropboxOpen === true,
                'hidden' : isDropboxOpen === false
              }
              )}
              >
              <Link href={'/mypage'} className='hover:font-bold'>마이페이지</Link>
              <div className='hover:font-bold cursor-pointer py-1' onClick={() => {signOut()}}>로그아웃</div>
              <div className="absolute bottom-full left-1/2 transform translate-x-6 w-0 h-0 border-solid border-8 border-transparent border-b-sygnature-beige"></div>
            </div>

          </div>
        </div>

        :

        // 비 로그인 상태일 때
        <div className="absolute right-0 top-4 flex items-center px-7 py-3">
          <div className="right-1 flex justify-center items-center text-sygnature-beige font-bold">
            <div className='mx-5 cursor-pointer' onClick={() => signIn()}>로그인</div>
            <Link href={'/signup'} className='mx-5'>회원가입</Link>
          </div>
        </div>
      }
    </div>
  )
}

export default HeaderInfo