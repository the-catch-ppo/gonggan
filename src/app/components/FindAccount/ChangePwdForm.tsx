"use client"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Title from "../Title";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

interface ChangePwdProps {
  id: string;
}

export default function ChangePwdForm({ id }: ChangePwdProps) {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      password: "",
      password_confirm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    try {
      const { data } = await axios.put("/api/accountFind/changePwd", {
        ...body,
        id
      });
      router.push("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Title type="비밀번호 변경" />
        <div className="mx-auto max-w-2xl p-5">
          <form onSubmit={handleSubmit(onSubmit)} className="m-auto p-11">
            <div className="form__block">
              <label className="lab" htmlFor="password">
                비밀번호
              </label>
              <input
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                  minLength: {
                    value: 8,
                    message: "여덟 글자 이상 입력해주세요.",
                  },
                })}
                className="in"
                type="password"
              />
              {errors.password && (
                <p className="text-sm text-red-500 p-2">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            <div className="form__block">
              <label className="lab" htmlFor="password_confirm">
                비밀번호 확인
              </label>
              <input
                {...register("password_confirm", {
                  required: "비밀번호 확인을 입력해주세요.",
                  validate: (val: string) => {
                    if (watch("password") != val) {
                      return "입력하신 비밀번호와 일치하지 않습니다.";
                    }
                  },
                })}
                className="in"
                type="password"
              />
              {errors.password_confirm && (
                <p className="text-sm text-red-500 p-2">
                  {errors?.password_confirm?.message}
                </p>
              )}
            </div>
            <div className="form__block">
              <input
                type="submit"
                value="변경하기"
                className="form__btn--submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}