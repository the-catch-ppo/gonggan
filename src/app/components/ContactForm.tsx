"use client";
export default function ContactForm() {
  return (
    <div className="mx-auto max-w-2xl p-5">

      <form action="/post" method="POST" className="m-auto p-11">
        <h1 className="text-3xl font-bold text-center">문의하기</h1>
        <div className="form__block">
          <label className="lab" htmlFor="email">
            이메일
          </label>
          <input className="in" type="email" name="email" id="email" required />
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="title">
            제목
          </label>
          <input className="in" type="title" name="title" id="title" required />
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="content">
            내용
          </label>
          <textarea
            className="h-[250px] w-full text-sm p-4 rounded-md max-w-[680px] border border-solid border-gray-300"
            name="content"
            id="content"
          ></textarea>
        </div>
        <div className="form__block">
          <input type="submit" value="문의하기" className="form__btn--submit" />
        </div>
      </form>

    </div>
  );
}
