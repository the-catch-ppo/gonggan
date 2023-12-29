import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function PoliceList() {
  const db = (await connectDB).db("gonggan");
  const result = await db.collection("police").find().toArray();

  return (
    <div>
      <div className="text-center font-extrabold text-2xl my-4">신고 목록</div>

      <div className="max-w-6xl mx-auto mt-12 text-center">
        <div className="bg-white p-4 shadow-lg">
          <table className="w-full">
            <thead>
              <tr className="h-14 border-b-4">
                <th className="py-2 w-96 ">장소</th>
                <th className="py-2 w-48 ">대상자</th>
                <th className="py-2 w-44 ">신고자</th>
                <th className="py-2 w-28 ">날짜</th>
                <th className="py-2 w-16 ">상태</th>
              </tr>
            </thead>

            <tbody className="">
              {result.reverse().map((x, i) => (
                <tr key={x._id.toString()} className="h-10">
                  <td className="py-2 ">
                    <Link
                      href={`/admin/police/list/${x._id.toString()}`}
                      className="hover:underline cursor-pointer"
                    >
                      {x.placename}
                    </Link>
                  </td>
                  <td className="py-2 hover:underline cursor-pointer">
                    {x.writerid}
                  </td>
                  <td className="py-2">{x.reporter}</td>
                  <td className="py-2">{x.date}</td>
                  <td className="py-2">{x.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
