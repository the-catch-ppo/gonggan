import { connectDB } from "@/util/database";
import Link from "next/link";

interface TableProps {
  type: string;
}

export default async function Table({ type }: TableProps) {
  const db = (await connectDB).db("gonggan");
  const contacts = await db.collection("contact").find().toArray();

  return (
    <>
      <div className="max-w-6xl mx-auto mt-12 text-center">
        <div className="bg-white p-4 shadow-lg">
          <table className="w-full">

            <thead>
              <tr className="h-14 border-b-4">
                <th className="py-2 w-96">제목</th>
                <th className="py-2 w-48">이메일</th>
                <th className="py-2 w-28 ">날짜</th>
                <th className="py-2 w-16 ">상태</th>
              </tr>
            </thead>

            <tbody className="">
              { 
                contacts.reverse().map((contact) => (
                  <tr key={contact._id.toString()} className="h-10">                    
                    <td className="py-2 ">
                      <Link 
                        href={`/admin/contact/list/${contact._id.toString()}`}
                        className="hover:underline cursor-pointer"
                      >
                        {contact.title}
                      </Link>
                    </td>
                    <td className="py-2">{contact.email}</td>
                    <td className="py-2">{contact.date}</td>
                    <td className="py-2">{contact.status}</td>
                  </tr>
                ))
                

              }


            </tbody>
          </table>

        </div>
        
      </div>
    </>
  );
}
