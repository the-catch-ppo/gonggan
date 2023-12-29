import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function post(request: any, response: any) {
  const { reviewId, nickname } = request.query;
  // const { reviewId, nickname } = request.body;
  console.log(request.body);

  try {
    const db = (await connectDB).db("gonggan");
    const user = await db.collection("users").findOne({ nickname });
    let res = "";
    const exist = await db.collection("like_review").findOne({
      review_id: new ObjectId(reviewId),
      liked_user: new ObjectId(user?._id),
    });

    if (exist) {
      await db.collection("like_review").updateOne(
        {
          review_id: new ObjectId(reviewId),
          liked_user: new ObjectId(user?._id),
        },
        {
          $set: { canceled: false },
        }
      );
      res = "update";
    } else {
      //없으면
      //크리에이트
      await db.collection("like_review").insertOne({
        review_id: new ObjectId(reviewId),
        liked_user: new ObjectId(user?._id),
        canceled: false,
      });
      res = "create";
    }

    response.status(200).json(res);
  } catch (error) {
    response.status(500).json("error");
  }
}
