import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {
  let session = await getServerSession(request, response, authOptions);

  if(request.method == 'DELETE') {
    try {
      const db = (await connectDB).db("gonggan");
      let result = await db.collection('like_place').deleteOne({
                                                      place_id: new ObjectId(request.query.place_id),
                                                      liked_user : new ObjectId(session.user.id)
                                                    })

      if (result) {        
        // response.redirect(200,'/mypage')
        response.status(200).json(result)
        } else {
        response.status(500).json({ error: 'Delete failed' });
      }     
    } catch (error) {
      console.log(error)
    }
  }
}
