export default function ContactList() {
  return (
    <div>
      <div className='text-center font-extrabold text-2xl my-4'>신고 목록</div>

      <div className="max-w-6xl mx-auto mt-12 text-center">
        <div className="bg-white p-4 shadow-lg">
          <table className="w-full">

            <thead>
              <tr className="h-14 border-b-4">
                <th className="py-2 w-96">장소</th>
                <th className="py-2 w-48">신고자</th>
                <th className="py-2 w-44 ">대상자</th>
                <th className="py-2 w-28 ">상태</th>
              </tr>
            </thead>

            <tbody className="">

              <tr className="h-10">
                <td className="py-2 hover:underline cursor-pointer">캐치 카페</td>
                <td className="py-2 hover:underline cursor-pointer">example@example.com</td>
                <td className="py-2 hover:underline cursor-pointer">gongganstudy@naver.com</td>
                <td className="py-2">진행 중</td>
              </tr>

              <tr className="h-10">
                <td className="py-2 hover:underline cursor-pointer">더 카페</td>
                <td className="py-2 hover:underline cursor-pointer">example@example.com</td>
                <td className="py-2 hover:underline cursor-pointer">gongganstudy@naver.com</td>
                <td className="py-2">진행 중</td>
              </tr>

              <tr className="h-10">
                <td className="py-2 hover:underline cursor-pointer">미유 커피</td>
                <td className="py-2 hover:underline cursor-pointer">example@example.com</td>
                <td className="py-2 hover:underline cursor-pointer">gongganstudy@naver.com</td>
                <td className="py-2">진행 중</td>
              </tr>

              <tr className="h-10">
                <td className="py-2 hover:underline cursor-pointer">캐치카페</td>
                <td className="py-2 hover:underline cursor-pointer">example@example.com</td>
                <td className="py-2 hover:underline cursor-pointer">gongganstudy@naver.com</td>
                <td className="py-2">진행 중</td>
              </tr>

              <tr className="h-10">
                <td className="py-2 hover:underline cursor-pointer">캐치카페</td>
                <td className="py-2 hover:underline cursor-pointer">example@example.com</td>
                <td className="py-2 hover:underline cursor-pointer">gongganstudy@naver.com</td>
                <td className="py-2">진행 중</td>
              </tr>

              <tr className="h-10">
                <td className="py-2 hover:underline cursor-pointer">캐치카페</td>
                <td className="py-2 hover:underline cursor-pointer">example@example.com</td>
                <td className="py-2 hover:underline cursor-pointer">gongganstudy@naver.com</td>
                <td className="py-2">진행 중</td>
              </tr>




            </tbody>
          </table>

        </div>
        <div className="my-12 text-lg">
          <span className="mx-1 cursor-pointer hover:font-bold">1</span>
          <span className="mx-1 cursor-pointer hover:font-bold">2</span>
          <span className="mx-1 cursor-pointer hover:font-bold">3</span>
          <span className="mx-1 cursor-pointer hover:font-bold">4</span>
          <span className="mx-1 cursor-pointer hover:font-bold">5</span>
          
          
        </div>
      </div>
    </div>
  )
}