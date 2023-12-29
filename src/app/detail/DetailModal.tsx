"use client";
import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdTime, IoIosArrowDown } from "react-icons/io";

interface ModalProps {
  handleModal?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const DetailModal: React.FC<ModalProps> = ({ handleModal }) => {
  const comments: any = Array(15).fill(1);

  const [limit, setLimit] = useState(5);

  const handleReadMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  if (comments.length === 0) return null;

  const commentList = comments.slice(0, limit).map(() => (
    <div className="m-auto w-[89%] p-5 border border-solid border-black rounded-md mb-5">
      <div className="flex justify-between mb-3">
        <div className="flex">
          <div className="w-11 h-11 mr-5 bg-black rounded-full"></div>
          <div className="flex items-center font-bold">강주하</div>
        </div>
        <div className="">
          <BiLike size="20" />
          <div className="text-sm">15</div>
        </div>
      </div>
      <div className="mb-3">★★★★☆ 4.5</div>
      <div className="mb-3">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </div>
      <div className="flex justify-end">신고하기</div>
    </div>
  ));

  return (
    <div>
      <div className="absolute top-0 w-full h-screen bg-black/50">
        <div className="m-auto w-[500px] max-w-2xl h-screen bg-white max-h-[100vh] overflow-y-auto">
          <div className="relative right-[-460px] pt-3 cursor-pointer z-10">
            <AiOutlineCloseCircle
              size="30"
              color="#000"
              onClick={handleModal}
            />
          </div>
          <div className="relative top-[-42px] w-full h-[350px] bg-gray-500"></div>
          <div className="flex px-8 pb-3 text-2xl font-bold">
            캐치카페 서울대
          </div>
          <div className="flex gap-5 px-8 pb-5">
            <div className="">★★★★☆ 4.5</div>
            <div className="">리뷰 59개</div>
          </div>
          <div className="flex gap-2 px-8 pb-5">
            <BiLike size="24" />
            {/* <BiSolidLike /> */}
            <div className="">15</div>
          </div>
          <div className="flex gap-2 px-8 pb-5">
            <FaMapMarkerAlt size="24" />
            <div className="">서울 관악구 관악로 165 홍빌딩 9층</div>
          </div>
          <div className="flex gap-2 px-8 pb-5">
            <IoMdTime size="24" />
            <div className="">월 12:00 ~ 22:00</div>
          </div>
          <div className="">
            <div className="px-8 pt-10 pb-3 text-2xl font-bold">리뷰</div>
            {commentList}
            <div className="flex justify-center pt-1 pb-5 cursor-pointer">
              {limit < comments.length && (
                <div className="flex justify-center w-[150px] p-2 bg-black/10 rounded-2xl">
                  <div onClick={handleReadMore}>리뷰 더 보기 &nbsp; </div>
                  <div className="flex items-center">
                    <IoIosArrowDown />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
