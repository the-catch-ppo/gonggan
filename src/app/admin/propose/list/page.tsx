import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function PlaceList() {
  const db = (await connectDB).db("gonggan");
  const result = await db.collection('propose').find().toArray();


  return (
    <div>
      <div className='text-center font-extrabold text-2xl my-4'>장소제안 목록</div>

      <div className="max-w-6xl mx-auto mt-12 text-center">
        <div className="bg-white p-4 shadow-lg">
          <table className="w-full">

            <thead>
              <tr className="h-14 border-b-4">
                <th className="py-2 w-96">장소</th>
                <th className="py-2 w-48">신청자</th>
                <th className="py-2 w-44 ">날짜</th>
                <th className="py-2 w-28 ">상태</th>
              </tr>
            </thead>

            <tbody className="">
              { 
                result.reverse().map((x, i) => (
                  <tr key={x._id.toString()} className="h-10">                    
                    <td className="py-2 ">
                      <Link 
                        href={`/admin/propose/list/${x._id.toString()}?_id=${x.proposerId}`}
                        className="hover:underline cursor-pointer"
                      >
                        {x.place_name}
                      </Link>
                    </td>
                    <td className="py-2 hover:underline cursor-pointer">{x.proposerId}</td>
                    <td className="py-2">{x.date}</td>
                    <td className="py-2">{x.status}</td>
                  </tr>
                ))
                

              }


            </tbody>
          </table>

        </div>
        
      </div>
    </div>
  )
}