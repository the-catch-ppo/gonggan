import { useEffect, useState } from "react";


interface Props {
  content: string, // 알람 내용
  receiver: string, // 받는사람 id ex) '65768fasl234uh2k3u4hk1j22'  
  link: string | "", // /, /mypage, or "" ""면 링크이동 안하는 내용만 있는 알람이 전송됨
  role: 'user' | 'admin' // user에게 보낼것인지 admin에게 보낼것인지
}

/** 
 * [content: string, // 알람 내용]
 * [receiver: string, // 받는사람 id ex) '65768fasl234uh2k3u4hk1j22'  ]
 * [link: string | "", // /, /mypage, or "" ""면 링크이동 안하는 내용만 있는 알람이 전송됨]
 * [role: 'user' | 'admin' // user에게 보낼것인지 admin에게 보낼것인지]
}
**/
export const useSendAlarm = async (content:string, receiver:string | "", link:string | "", role:'user' | 'admin') => {
  let response = '';
  const temp = {
    content: content,
    receiver: receiver,
    link: link,
    role: role
  }
    try {
      /** 
       * Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer 
       * 그래서 query가 아닌 body로 보냄.
       * **/

      response = await fetch('/api/alarm/sendAlarm', {method: 'POST', body: JSON.stringify(temp)}).then(r=>r.json())
    } catch (error) {
      throw new Error(error?.toString())
    }

    return response;

  } 
  

  
