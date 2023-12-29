import { Roboto } from "next/font/google";
import SearchBar from "./components/SearchBar";
import HotPlace from "./components/HotPlace";
import Map from "./components/Map";
import Space from "./components/Space";
import Marker from "./components/Markers";
import { PlaceType } from "./interface";
import axios from "axios";
import CurrentPlaceBox from "./components/CurrentPlaceBox";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function Home() {
  // const db = (await connectDB).db("gonggan");
  // let result = await db.collection('like_place').find().toArray();

  const places: PlaceType[] = await getData();

  return (
    <div className={`${roboto.className} `}>
      {/* Search Bar */}
      <SearchBar />
      <div className="m-12 h-screen">
        <div className="flex gap-10 sm:flex-col md:flex-row">
          <div className="w-3/5 h-vh">
            <Map />
            <Marker places={places} />
            <CurrentPlaceBox />
          </div>
          <div className="w-2/5">
            <Space category="주변" places={places} />
          </div>
        </div>
      </div>
      {/* 핫한공간 */}
      <HotPlace />
    </div>
  );
}

async function getData() {
  try {
    const res = await axios.get("http://localhost:3000/api/places/route");
    const data = res.data;
    return data;
  } catch (e) {
    console.log(e);
  }
}
