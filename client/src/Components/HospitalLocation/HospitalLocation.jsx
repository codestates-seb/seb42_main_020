import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const SLayout = styled.div`
  margin: 10px 0;
  box-shadow: 3px 2px 3px 2px var(--gray-200);
`;

const HospitalLocation = ({ reviewData }) => {
  const { kakao } = window;

  const [placeName, setPlaceName] = useState(['']); // 병원 이름 상태
  const [isMatched, setIsMatched] = useState(false);

  const ref = useRef(); // 위치 참조
  console.log(ref.current);

  useEffect(() => {
    if (reviewData) setPlaceName(reviewData?.hospitalName);

    // 마커를 클릭하면 장소명을 표출할 인포 윈도우
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = ref.current;
    const options = {
      center: new kakao.maps.LatLng(37.54699, 127.09598),
      levle: 3,
    };
    const map4 = new kakao.maps.Map(container, options);

    let count = 0;

    const ps = new kakao.maps.services.Places();
    const bounds = new kakao.maps.LatLngBounds();

    // 키워드 검색 완료 시 호출되는 콜백 함수
    const placesSearchCB = (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        displayMarker(data[0]);
        // console.log('장소', placeName);
        // console.log('검색된 장소', data[0].place_name);

        bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));

        if (count !== placeName.length) {
          keywordSearch(placeName);
        } else if (count === placeName.length) {
          setBounds();
        }
      }
    };

    // 검색 후 첫번째 값의 장소 마크하는 함수
    const displayMarker = (place) => {
      var marker = new kakao.maps.Marker({
        map: map4,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      // 마커에 장소명이 인포 윈도우에 표출
      infowindow.setContent(`<div style="padding:5px;font-size:12px; text-align: center;">${place.place_name}
      <a style="padding:5px; text-align: center;" href=https://map.kakao.com/link/search/${placeName}> 길찾기 바로가기</a>
      </div>`);
      infowindow.open(map4, marker);
      console.log(place.place_name);
      console.log(placeName);
      if (placeName !== place.place_name) {
        setIsMatched(false);
      }
    };

    // 범위를 재설정 하는 함수
    const setBounds = () => {
      map4.setBounds(bounds, 90, 30, 10, 30);
    };

    const keywordSearch = async (keyword) => {
      ps.keywordSearch(keyword, placesSearchCB);
      count = count + 1;
    };

    if (placeName !== undefined && container !== undefined) {
      keywordSearch(placeName);
      setIsMatched(false);
    }
  });

  return (
    <>
      <SLayout>
        <div
          id="map4"
          ref={ref}
          style={{ width: '780px', height: '295px' }}
        ></div>
      </SLayout>
      {isMatched ? <span>일치한 장소가 없어용</span> : <></>}
    </>
  );
};

export default HospitalLocation;
