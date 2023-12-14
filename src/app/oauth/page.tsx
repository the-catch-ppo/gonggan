import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";


export default async function SignUpForm() {
  let session = await getServerSession(authOptions);

  const db = (await connectDB).db("gonggan");
  let result = await db.collection('users').findOne({name : session.user.name})

  // 세션 정보와 Oauth 정보를 합쳐 db 업데이트 하기 위한 정보 생성
  let temp = 
        {
                  ...result,
            ...session.user,
              nickname : '',
              password : '',
              alarm : false,
              role : ''
        }


  let update = await db.collection('users').updateOne(
    {_id : new ObjectId(temp._id)},
    {$set : temp}
  )
    

  return (
    <div className="mx-auto max-w-2xl p-5">
      <form action="/api/post/oauth" method="POST" className="m-auto p-11">
        <h1 className="text-3xl font-bold text-center">회원가입</h1>

        <div className="form__block">
          <label className="lab" htmlFor="id">
            이메일<span className="text-red-900 font-bold">*</span>
          </label>
          <input className="in" type="text" name="email" id="email" required />
        </div>
        <div className="form__block">

          <label className="lab" htmlFor="nickname">
            닉네임<span className="text-red-900 font-bold">*</span>
          </label>
          <input
            className="in"
            type="text"
            name="nickname"
            id="nickname"
            required
          />
        </div>
        <div className="form_block">
        </div>
        <div className="form_block flex">
          <input
            type="checkbox"
            name="alarm"
            id='alarm'
            className="w-5 h-5 mt-5 mr-2 accent-yellow-900"
          />
          <p className="mt-5">댓글 및 공(工)간의 정보 알림 받기</p>
        </div>
        {/* 유저 정보 숨겨서 보내기 */}
        <input 
          className='hidden'
          type="text"
          name="_id"
          id='_id'
          value={temp._id}
        />
        <div className="form__block">
          <input type="submit" value="가입완료" className="form__btn--submit" />
        </div>
      </form>
    </div>
  );
}
