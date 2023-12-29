import { useState } from "react";
import { PlaceType } from "../interface";
import { IoIosArrowDown } from "react-icons/io";

interface SurroundingsProps {
  places?: PlaceType[];
}

export default function Surroundings({ places }: SurroundingsProps) {
  const currentX: number = 126.952712; // 경도 Longitude
  const currentY: number = 37.48121; // 위도 Latitude

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // 지구의 반지름 (단위: km)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const nearbyLocations = places?.filter((place) => {
    const distance = calculateDistance(
      currentY,
      currentX,
      Number(place.y),
      Number(place.x)
    );
    return distance <= 1;
  });

  const spaces = nearbyLocations?.map((place) => {
    const distance = calculateDistance(
      currentY,
      currentX,
      Number(place.y),
      Number(place.x)
    );
    const mDistance = Number(distance.toFixed(2)) * 1000 + "m";
    return { ...place, mDistance };
  });

  const [limit, setLimit] = useState(2);

  const handleReadMore = () => {
    setLimit((prevLimit) => prevLimit + 2);
  };

  if (spaces?.length === 0) return null;

  const spacesList = spaces?.slice(0, limit).map((space, index) => (
    <div key={index}>
      <div className="m-4 p-2 flex justify-between">
        <div className="flex gap-[5px] ">
          <div className="text-lg ">{space.location}</div>
          <div className="text-xs mt-[9px] text-sygnature-brown">
            {space.category_group_name}
          </div>
        </div>
        <div className="text-xs mt-[9px] text-sygnature-brown">
          {space.mDistance}
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {spacesList}
      <div className="flex justify-center pt-1 cursor-pointer">
        {spaces && limit < spaces.length && (
          <div className="flex justify-center pb-5 w-[150px] p-2">
            <div onClick={handleReadMore}>더 보기 &nbsp; </div>
            <div className="flex items-center">
              <IoIosArrowDown />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
