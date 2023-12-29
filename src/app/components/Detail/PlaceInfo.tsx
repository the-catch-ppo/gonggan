import axios from "axios";
import React from "react";
import { BiLike } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { useQuery } from "react-query";
import { PlaceType } from "../../interface";

interface PlaceProps {
  _id: string;
}

export default function PlaceInfo({ _id }: PlaceProps) {
  const getPlace = async () => {
    const { data } = await axios.get(`/api/place/route?_id=${_id}`);
    return data as PlaceType;
  };

  const {
    data: place,
    isFetching,
    isSuccess,
    isError,
  } = useQuery<PlaceType>(`place-${_id}`, getPlace, {
    enabled: !!_id,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="flex px-8 pb-3 text-2xl font-bold">
        {place?.place_name}
      </div>
      <div className="flex gap-5 px-8 pb-5">
        <div className="">★★★★☆ 4.5</div>
      </div>
      <div className="flex gap-2 px-8 pb-5">
        <BiLike size="24" />
        {/* <BiSolidLike /> */}
        <div className="">15</div>
      </div>
      <div className="flex gap-2 px-8 pb-5">
        <FaMapMarkerAlt size="24" />
        <div className="">{place?.road_address_name}</div>
      </div>
      <div className="flex gap-2 px-8 pb-5">
        <IoMdTime size="24" />
        <div className="">월 12:00 ~ 22:00</div>
      </div>
    </>
  );
}
