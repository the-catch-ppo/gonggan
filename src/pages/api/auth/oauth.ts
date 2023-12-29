import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "POST") {
    const temp = { ...request.body };
    const update = {
      email: temp.email,
      nickname: temp.nickname,
      alarm: temp.alarm,
      role: "user",
    };

    const db = (await connectDB).db("gonggan");
    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(temp._id) }, { $set: update });
    if (result) {
      response.redirect(301, "/");
    } else {
      response.status(500).json("카카오 로그인 실패");
    }
  }
}
