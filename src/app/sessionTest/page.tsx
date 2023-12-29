import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";



const IndexPage = async () => {
  // let session = await getServerSession(authOptions);
  // console.log('session',session)
  
  return (
    <div>
      
      {/* <ImageUpload /> */}
      <div>업로드하기</div>

      {/* 프리뷰랑 업로드 가르기 */}
    </div>
  )
};

export default IndexPage;
