"use client";
import PlaceInfo from "@/app/components/Detail/PlaceInfo";
import PlaceReviews from "@/app/components/Detail/PlaceReviews";
import React from "react";

export default function PlacePage({ params }: { params: { _id: string } }) {
  const _id = params?._id;

  return (
    <>
      <div>
        <div className="m-auto mt-[40px] w-[50%] max-w-2xl h-screen bg-white max-h-[100vh]">
          <div className="relative top-[-42px] w-full h-[350px] bg-gray-500"></div>
          <PlaceInfo _id={_id} />
          <PlaceReviews _id={_id} />
        </div>
      </div>
    </>
  );
}
