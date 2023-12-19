import { atom } from "recoil";
import { LocationType, PlaceType } from "../interface";

const DEFAULT_LAT = "37.48120720000076";
const DEFAULT_LNG = "126.94713128189409";
const DEFAULT_ZOOM = 3;

export const mapState = atom<any>({
  key: "map",
  default: null,
  dangerouslyAllowMutability: true, // 직접적인 변경을 허용
});

export const currentPlaceState = atom<PlaceType | null>({
  key: "place",
  default: null,
})

export const locationState = atom<LocationType>({
  key: "location",
  default: {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
    zoom: DEFAULT_ZOOM,
  }
});