"use client";
import React, { useState } from "react";
import Surroundings from "./Surroundings";
import { PlaceType } from "../interface";

interface SpaceProps {
  category: string;
  places: PlaceType[];
}

export default function Space({ category, places }: SpaceProps) {

  return (
    <>
      <p className="text-2xl font-bold">{category} 공간</p>
      <div className="my-5 mx-2 w-full h-auto border border-[#998373] rounded-md">
        <Surroundings places={places} />
      </div>
    </>
  );
}
