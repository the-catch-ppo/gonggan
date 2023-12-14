import ModalPropose from "./ModalPropose";

export default function Propose() {
  return (
    <div>
      <div className='text-center font-extrabold text-2xl my-4'>장소 제안하기</div>

      <form className="mx-auto max-w-screen-sm p-5 mt-5">
        <div className="font-semibold">위치</div>
        <input className="my-2 border-gray-300 w-full" name="location" />

        <div className="font-semibold mt-2">영업시간</div>
        <div className="flex flex-row mt-2 mb-4">
          <input name="openhour" className="border-gray-300" />
          <span className="flex items-center mx-4"> ~ </span>
          <input name="closehour" className="border-gray-300" />
        </div>

        <div className="font-semibold">영업일</div>
        <div className="flex flex-row items-center justify-center my-2">
          <input name="businessday_mon" type="checkbox" className="w-7 h-7 accent-sygnature-brown ml-4" />
          <span className="ml-2 mr-8 block">월</span>
          <input name="businessday_mon" type="checkbox" className="w-7 h-7 accent-sygnature-brown" />
          <span className="ml-2 mr-8 block">화</span>
          <input name="businessday_mon" type="checkbox" className="w-7 h-7 accent-sygnature-brown" />
          <span className="ml-2 mr-8 block">수</span>
          <input name="businessday_mon" type="checkbox" className="w-7 h-7 accent-sygnature-brown" />
          <span className="ml-2 mr-8 block">목</span>
          <input name="businessday_mon" type="checkbox" className="w-7 h-7 accent-sygnature-brown" />
          <span className="ml-2 mr-8 block">금</span>
          <input name="businessday_mon" type="checkbox" className="w-7 h-7 accent-sygnature-brown" />
          <span className="ml-2 mr-8 block">토</span>
          <input name="businessday_mon" type="checkbox" className="w-7 h-7 accent-sygnature-brown" />
          <span className="ml-2 mr-4 block">일</span>
        </div>

        <div className="font-semibold mt-4 mb-2 w-full">전화번호</div>
        <input name="phone" className="border-gray-300 w-full" />

        <div className="font-semibold my-2">이용방법</div>
        <input name="howtouse" className="h-40 border-gray-300 w-full" />

        <div className="font-semibold my-2">설명</div>
        <input name="desc" className="h-40 border-gray-300 w-full" />
        


      </form>

      <ModalPropose />


    </div>
  )
}