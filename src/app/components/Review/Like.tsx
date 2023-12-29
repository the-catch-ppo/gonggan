"use client";
import axios from "axios";
import { ObjectId } from "mongodb";
import React from "react";
import { useEffect, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { ReviewType } from "../../interface";

interface LikeProps {
  review: ReviewType;
  nickname: string;
}

interface ReviewLikeProps {
  review_id: ObjectId;
  liked_user: ObjectId;
  canceled: boolean;
}

export default function Like({ review, nickname }: LikeProps) {
  const [countLike, setCountLike] = useState(review.like);
  const [like, setLike] = useState<ReviewLikeProps>();
  const [isLike, setIsLike] = useState<boolean>();

  useEffect(() => {
    const getLike = async () => {
      const { data } = await axios.get(
        `/api/review/getLike?nickname=${nickname}&reviewId=${review._id}`
      );

      setLike(data);
      setIsLike(
        like?.review_id.toString().includes(review._id.toString()) &&
          like.canceled == false
      );
      // console.log("use", isLike);
    };

    getLike();
  }, [review._id, isLike]);

  // 좋아요 수 변경 시
  useEffect(() => {
    const postLikeCount = async () => {
      await axios.post(`/api/review/updateReview`, {
        reviewid: review._id,
        like: countLike,
      });
    };
    postLikeCount();
  }, [countLike]);

  const onClick = async () => {
    try {
      console.log("isLike", isLike);
      if (isLike) {
        // 좋아요 삭제
        await axios.delete(
          `/api/review/deleteLike?reviewId=${review._id}&nickname=${nickname}`
        );
        setIsLike(!isLike);
        // 좋아요 수 -1
        setCountLike(countLike - 1);
      } else {
        // 좋아요 생성
        const response = await axios.post(
          `/api/review/createLike?reviewId=${review._id}&nickname=${nickname}`
        );
        setIsLike(!isLike);
        // 좋아요 수 +1
        setCountLike(countLike + 1);

        if (response.data == "create") {
          const temp = {
            check: false,
            content: `${nickname}님이 내 리뷰에 좋아요를 보냈습니다.`,
            date: new Date(),
            link: "",
            receiver: review.writerid,
            role: "user",
          };
          const sendAlarm = await fetch("/api/alarm/sendAlarm", {
            method: "POST",
            body: JSON.stringify(temp),
          }).then((r) => r.json());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="">
        <div onClick={onClick}>
          {like?.canceled == false ? (
            <div className="cursor-pointer">
              <BiSolidLike size="25" />
            </div>
          ) : (
            <div className="cursor-pointer">
              <BiLike size="25" />
            </div>
          )}
        </div>

        <div className="text-xs text-center mt-1">{countLike}</div>
      </div>
    </>
  );
}
