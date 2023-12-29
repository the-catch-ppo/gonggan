/* eslint-disable prefer-const */
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { FaFlag, FaMapMarkerAlt  } from "react-icons/fa";
import { useDebounce } from '../hooks/useDebounce';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { mapState } from '../atom';


interface Result {
  _id?: string,
  address_name : string,
  category_group_code : string,
  category_group_name : string,
  category_name : string,
  distance : string,
  id : string,
  phone : string,
  place_name : string,
  place_url : string,
  road_address_name : string,
  x : string,
  y : string,
}


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [place, setPlace] = useState([]);
  const [placeInfo, setPlaceInfo] = useState<Result | null>(null);
  const [map, setMap] = useRecoilState(mapState);

  const apiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
  
      // 클릭된 엘리먼트가 input 엘리먼트 혹은 그 자손인 경우에는
      // setFocus(false)를 호출하지 않음
      if (inputRef.current && inputRef.current.contains(target)) {
        return;
      }
  
      // 다른 곳을 클릭한 경우 setFocus(false) 호출
      
      setFocus(false);
    };
  
    // document에 클릭 이벤트 리스너 추가
    document.addEventListener("click", handleClickOutside);
  
    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); // useEffect는 한 번만 실행되도록 빈 배열을 전달


  const handleSearch = async (searchQuery:string) => {
    
    
    try {
      // 검색어가 빈칸일땐 호출하지 않음
      if(query.length > 0) {
        setPlaceInfo(null)
        let datas = [];
        const apiUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${searchQuery}`;
        
        const place = await fetch(`/api/place/placeSearch?query=${searchQuery}`, { method: 'GET' })
                                                                              .then(r => r.json())
                                                                              // .then(r => datas.push(...r))
        datas.push(...place)                  
        setPlace(place);                                    
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Authorization: `KakaoAK ${apiKey}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('네트워크 응답이 정상이 아닙니다');
        }
  
        const data = await response.json();
        datas.push(...data.documents)
        
        setResults(datas);
        if(!placeInfo) {
          setFocus(true)
        }
        
        
      }
    } catch (error) {
      console.error('데이터를 불러오는 중 오류 발생:', error);
    }
  };

  // 검색 api 호출에 0.5초 딜레이를 줌
  const debouncedQuery = useDebounce(query, 300);
  useEffect(() => {
    handleSearch(debouncedQuery);
  }, [debouncedQuery])

  const handleclick = (e:React.MouseEvent<HTMLElement>) => {
    setQuery('')
    setFocus(false)
    setResults([])

  }



  const handleFocus = () => {
    setFocus(true);
  }
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);    
    
  };

  const handleResultClick = (result:Result) => {
    // 클릭한 결과 정보를 출력
    setQuery(result.place_name)
    setPlaceInfo(result)
    setFocus(false);    

    // 이동할 위도 경도 위치를 생성합니다 
    const moveLatLon = new window.kakao.maps.LatLng(result.y, result.x);      
    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
    const iwContent = `<div style="padding:10px;">${result.place_name}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwPosition = new window.kakao.maps.LatLng(result.y, result.x), //인포윈도우 표시 위치입니다
    iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 인포윈도우를 생성하고 지도에 표시합니다
    const infowindow = new window.kakao.maps.InfoWindow({
        map: map, // 인포윈도우가 표시될 지도
        position : iwPosition, 
        content : iwContent,
        removable : iwRemoveable
    });
    
  };
  return (
    <div className="p-3 h-30 z-0 flex flex-col items-center">
      <div className='relative w-128 flex flex-row justify-center items-center border-2 rounded-3xl overflow-hidden border-sygnature-brown hover:shadow-lg'>
        <span className='bg-white text-2xl h-8 -mr-1 z-10 font-bold text-sygnature-brown mx-3 cursor-pointer'>工</span>
        <input 
            className="px-4 my-2 border-gray-300 border-opacity-0 w-128 focus:outline-none " 
            name="location" 
            onFocus={handleFocus} 
            value={query}
            onChange={handleChange}
            ref={inputRef} // ref를 추가하여 input 엘리먼트에 대한 참조를 설정
            autoComplete="off"
            placeholder='동네 이름, 매장 이름'
        />
        <div 
          className='w-10 text-2xl text-sygnature-brown cursor-pointer hover:font-bold'
          onClick={handleclick}
        >X</div>
      </div>
      <div className={`z-50 border-2 border-t-0 rounded-b-3xl absolute w-128 top-44 -m-7 pb-3 pt-3 -translate-y-3 bg-white border-sygnature-brown hover:shadow-lg ${focus ? 'visible' : 'hidden'}`}>
        <ul>
          {
            
            results.map((result:Result,i) => (
              <li 
                className={`cursor-pointer p-1 m-1 hover:bg-gray-100 ${result._id? 'text-sygnature-brown': ''}`}
                key={i} 
                onClick={() => handleResultClick(result)}
              >
                {result._id?<FaMapMarkerAlt className='inline' />:''}
                <span className="font-bold"> {result.place_name}</span>
                <span> [{result.address_name}],</span>
                <span> [{result.road_address_name}]</span>
              </li>
            ))
          }
          {
            place.length
            ?
            ''
            :
            <li>
                <div className='w-128 h-24 flex flex-col justify-center items-center overflow-hidden'>
                  <div className='p-3 text-2xl font-bold'>&quot;{query}&quot; 검색 결과 없음</div>
                  <div 
                    className='p-1 cursor-pointer text-blue-600 mb-1 hover:font-bold hover:underline'
                  ><Link href={'/propose'}>+ 장소 제안하기</Link></div>
                </div>
              </li>
          }
      </ul>
      </div>



      
    </div>
  )
}

export default SearchBar