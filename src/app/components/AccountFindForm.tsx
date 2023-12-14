"use client";
import Link from "next/link";

export default function AccountFindForm() {
  return (
    <div className="mx-auto max-w-2xl p-5">
      <form action="/post" method="POST" className="m-auto p-11">
        <h1 className="text-3xl font-bold text-center">
          아이디 및 비밀번호 찾기
        </h1>
        <div className="form_block">
          <p className="my-16">
            비밀번호를 초기화 하는 방법을 이메일 주소로 전송했습니다. <br />
            가입한 적이 없는 이메일 주소나 올바르지 않은 이메일 주소를 입력하신 경우에는 메일을 받을 수 없습니다
          </p>
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="email">가입하신 이메일</label>
          <input className="in" type="email" name="email" id="email" required />
        </div>
        <div className="form_block">
          <p className="mt-5">캡챠</p>
        </div>
        <div className="form__block">
          <input
            type="submit"
            value="이메일 전송하기"
            className="form__btn--submit"
          />
        </div>
      </form>
    </div>
  );
}
