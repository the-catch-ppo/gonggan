"use client";

import axios from "axios";
import { useForm } from "react-hook-form";

export default function AccountFindForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="mx-auto max-w-2xl p-5">
      <form action="/post" method="POST" className="m-auto p-11">
        <h1 className="text-3xl font-bold text-center">
          아이디 및 비밀번호 찾기
        </h1>
        <div className="form_block">
          <p className="my-16">
            비밀번호를 초기화 하는 방법을 이메일 주소로 전송했습니다. <br />
            가입한 적이 없는 이메일 주소나 올바르지 않은 이메일 주소를 입력하신
            경우에는 메일을 받을 수 없습니다
          </p>
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="email">
            가입하신 이메일
          </label>
          <input
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "이메일형식으로 기입해주세요.",
              },
              validate: async (val: string) => {
                try {
                  const res = await axios.post("/api/duplicate/route", {
                    email: val,
                  });
                  if (res.data != "duplication") {
                    return "존재하지 않는 이메일입니다..";
                  }
                } catch (error) {
                  console.log(error);
                }
              },
            })}
            className="in"
          />
          {errors.email && (
            <p className="text-sm text-red-500 p-2">{errors.email.message}</p>
          )}
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
