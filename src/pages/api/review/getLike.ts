import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { nickname, reviewId } = request.query;
  const db = (await connectDB).db("gonggan");

  console.log(nickname, reviewId);

  try {
    const user = await db.collection("users").findOne({ nickname });
    const reviewLike = await db.collection("like_review").findOne({
      review_id: new ObjectId(reviewId?.toString()),
      liked_user: new ObjectId(user?._id.toString()),
    });

    response.status(200).json(reviewLike);
  } catch (error) {
    response.status(500).json("error");
  }
}
