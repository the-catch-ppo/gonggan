"use client";
import { FaToggleOn } from "react-icons/fa";

export default function ProfileForm() {
  return (
    <div className="mx-auto max-w-2xl p-5">
      <h1 className="text-3xl font-bold text-center mb-[40px]">프로필 수정</h1>
      <div className="flex justify-center mb-5">
        <div className="bg-black w-[100px] h-[100px] rounded-full"></div>
      </div>
      <div className="flex justify-center">
        <button className="border-2 border-[#998373] rounded-sm bg-inherit text-[#998373] text-xs w-[100px] h-[30px]">
          이미지 업로드
        </button>
      </div>
      <form action="/post" method="POST" className="m-auto p-11">
        <div className="form__block">
          <div className="flex justify-between mr-2">
            <p className="font-bold text-xl">알림 받기</p>
            <FaToggleOn size="30" color="#998373" />
          </div>
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="id">
            아이디
          </label>
          <input
            className="in bg-[#D9D4C8]"
            value="wnwlcks123"
            type="text"
            name="id"
            id="id"
            disabled
          />
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="nickname">닉네임</label>
          <input
            className="in"
            value="내미래보다선명하다"
            type="text"
            name="nickname"
            id="nickname"
            required
          />
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="currentpw">현재 비밀번호</label>
          <input
            className="in"
            type="password"
            name="currentpw"
            id="currentpw"
            required
          />
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="newpw">새로운 비밀번호</label>
          <input
            className="in"
            type="password"
            name="newpw"
            id="newpw"
            required
          />
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="newpw_confirm">새로운 비밀번호 확인</label>
          <input
            className="in"
            type="password"
            name="newpw_confirm"
            id="newpw_confirm"
            required
          />
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="email">이메일</label> 
          <input
            className="in"
            value="wnwlcks123@gamil.com"
            type="text"
            name="email"
            id="email"
            required
          />
        </div>
        <div className="form_block">
          <p className="mt-5 text-red-500">입력한 암호가 일치하지 않습니다.</p>
        </div>
        <div className="form__block">
          <input type="submit" value="수정하기" className="form__btn--submit" />
        </div>
      </form>
      <div className="m-auto p-8">
        <p className="w-full max-w-[680px] text-center">회원 탈퇴</p>
      </div>
    </div>
  );
}
