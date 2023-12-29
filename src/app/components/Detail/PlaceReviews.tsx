import axios from "axios";
import { ReviewType } from "../../interface";
import { useQuery } from "react-query";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import ReviewShape from "../Review/ReviewShape";
import { useSession } from "next-auth/react";
import ModalDelete from "@/app/mypage/ModalDelete";
import Star from "../Review/Star";
import Like from "../Review/Like";
import ModalPolice from "../ModalPolice";

interface PlaceProps {
  _id: string;
}

export default function PlaceReviews({ _id }: PlaceProps) {
  // 사용자 정보
  const { data: userData, status }: any = useSession();

  const getReviews = async () => {
    const { data } = await axios.get(`/api/reviews/findReviews?_id=${_id}`);
    return data as ReviewType[];
  };

  const {
    data: reviews,
    isFetching,
    isSuccess,
    isError,
  } = useQuery<ReviewType[]>(`review-${_id}`, getReviews, {
    enabled: !!_id,
    refetchOnWindowFocus: false,
  });

  const [limit, setLimit] = useState(5);

  const handleReadMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  const [reviewWrite, setReviewWrite] = useState(false);
  const [reviewModify, setReviewModify] = useState(false);
  const [reviewDelete, setReviewDelete] = useState(false);
  const [review, setReview] = useState<ReviewType>();
  const [like, setLike] = useState(false);

  const [policeWrite, setPoliceWrite] = useState(false);

  // 리뷰 모달
  const onClick = (
    e: React.MouseEvent<HTMLDivElement>,
    review?: ReviewType
  ) => {
    e.preventDefault();
    const { id } = e.currentTarget;

    if (id == "write") {
      setReviewWrite(!reviewWrite);
    }

    if (id == "modify") {
      setReview(review);
      setReviewModify(!reviewModify);
    }

    if (id == "delete") {
      setReview(review);
      setReviewDelete(!reviewDelete);
    }

    if (id == "police") {
      setReview(review);
      setPoliceWrite(!policeWrite);
    }
  };

  return (
    <>
      <div className="flex justify-between px-8 pt-10 pb-5 ">
        <div className="flex gap-3">
          <div className="text-3xl font-bold">리뷰</div>
          <div className="mt-3">리뷰 {reviews?.length}개</div>
        </div>
        {status == "authenticated" && (
          <div
            className="m-2 pt-[6px] cursor-pointer"
            id="write"
            onClick={(e) => onClick(e)}
          >
            리뷰 작성하기
          </div>
        )}
      </div>
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index}>
            <div className="m-auto w-[89%] p-5 border border-solid border-black rounded-md mb-5">
              <div className="flex justify-between mb-3">
                <div className="flex">
                  <div className="w-11 h-11 mr-5 bg-black rounded-full"></div>
                  <div className="flex items-center font-bold">
                    {review.writernickname}
                  </div>
                </div>
                <div className="mt-3">
                  <Like review={review} nickname={userData?.user?.nickname} />
                </div>
              </div>
              <div className="mb-3">
                <Star star={review.star} />
              </div>
              <div className="mb-3">{review.content}</div>
              {userData && userData.user?.nickname == review.writernickname ? (
                <div className="flex justify-end gap-2 text-xs">
                  <div
                    id="modify"
                    onClick={(e) => onClick(e, review)}
                    className="flex justify-end cursor-pointer"
                  >
                    수정하기
                  </div>
                  <div
                    id="delete"
                    onClick={(e) => onClick(e, review)}
                    className="flex justify-end cursor-pointer"
                  >
                    삭제하기
                  </div>
                </div>
              ) : (
                <div
                  id="police"
                  onClick={(e) => onClick(e, review)}
                  className="flex justify-end text-xs cursor-pointer"
                >
                  신고하기
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center p-10 first-letter:text-lg">
          작성된 리뷰가 없습니다.
        </div>
      )}
      <div className="flex justify-center pt-1 pb-5 cursor-pointer">
        {reviews && limit < reviews.length && (
          <div className="flex justify-center w-[150px] p-2 bg-black/10 rounded-2xl">
            <div onClick={handleReadMore}>리뷰 더 보기 &nbsp; </div>
            <div className="flex items-center">
              <IoIosArrowDown />
            </div>
          </div>
        )}
      </div>

      {/* 모달 */}
      {reviewWrite ? (
        <ReviewShape
          onClick={onClick}
          _id={_id}
          userData={userData}
          type="write"
        />
      ) : (
        ""
      )}
      {reviewModify ? (
        <ReviewShape
          onClick={onClick}
          review={review}
          _id={_id}
          userData={userData}
          type="modify"
        />
      ) : (
        ""
      )}
      {reviewDelete ? (
        <ModalDelete targetContent={review} handleDelete={onClick} />
      ) : (
        ""
      )}
      {policeWrite ? (
        <ModalPolice targetContent={review} handleWrite={onClick} />
      ) : (
        ""
      )}
    </>
  );
}
