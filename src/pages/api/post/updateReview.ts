import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {
  
  if(request.method = 'POST') {
    try {
      const db = (await connectDB).db("gonggan");
      let result = await db.collection('review').updateOne(
        {
          placeid : new ObjectId(request.body.placeid),
          writerid: new ObjectId(request.body.writerid)
        },
        {$set : {content: request.body.newContent, star: request.body.star} }
      )
      
      if (result) {
        response.redirect(301,'/mypage')
        } else {
        response.status(500).json({ error: 'Update failed' });
      }      
    } catch (error) {
      console.log(error)
    }
  }

  }
