import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTotalPages } from "../store/pageSlice";

function NeckItems() {
  const dispatch = useDispatch();

  // 현재 페이지 상태
  const currentPage = useSelector((state) => state.page.currentPage);

  // 한 페이지에 보여줄 개수
  const itemsCount = 9;

  // 상품 목록 담을 그릇 - 초기값으로 빈 배열 설정
  // 상태를 빈 배열로 시작하고, 나중에 데이터를 받아와서 배열에 데이터를 저장
  // 원본과 화면에 보여줄 데이터를 분리해서 상태로 관리
  const [originalData, setOriginalData] = useState([]); // 상품 원본 보관용
  const [visibleData, setVisibleData] = useState([]);

  // 상품 데이터(외부데이터) 갖고오기 - 처음 화면에 나타날 때만 실행
  useEffect((error) => {
    axios
      .get("https://yihyoni.github.io/nff_product/necklace.json")
      .then((response) => {
        const sorted = [...response.data].sort((a, b) => a.id - b.id);
        // 오름차순 정렬
        setOriginalData(sorted); // 원본 저장
        setVisibleData(sorted); // 복제본에다가도 저장

        // 총 페이지 수 계산 및 업데이트
        const totalPages = Math.ceil(sorted.length / itemsCount);
        dispatch(setTotalPages(totalPages)); // 페이지 수 업데이트
      })
      .catch((error) => {
        console.error("데이터 로드 실패:", error);
      });
  }, []);

  // 처음에 데이터 없는 상태라 빈배열인 경우 오류 방지
  // 데이터가 로드되지 않았을 때 로딩 메시지 표시
  // 아이템 배열의 길이가 0 이면, 아이템 배열이 비어있으면 return 문 출력.
  if (visibleData.length === 0) {
    return <p>LOADING...</p>;
  }

  // 현재 페이지의 시작 인덱스
  const startIndex = (currentPage - 1) * itemsCount;
  // 끝 인덱스
  const endIndex = startIndex + itemsCount;
  // 현재 페이지에 맞는 상품들만 선택
  const currentItems = visibleData.slice(startIndex, endIndex);
  // currentPage가 바뀌면 → slice 구간이 바뀌고 → map 결과가 달라져서 → 화면이 바뀜.

  return (
    <div className="item-container">
      {/* map 함수 이용해서 데이터 개수만큼 생성. */}
      {/* 해당 상품의 id로 상품 보여주기 */}
      {currentItems.map((a) => {
        return (
          <div key={a.id} className="item">
            {/* 상품 이미지 클릭 시 해당 상품 페이지로 이동 */}
            <Link to={`/detail/necklace/${a.id}`}>
              <div className="overlay-wrap">
                <div className="overlay">
                  <p>{a.title}</p>
                  <p>{a.price}</p>
                </div>
              </div>

              <img
                src={`https://yihyoni.github.io/nff_product/necklace/necklace${a.id}.jpg`}
                alt={a.title}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default NeckItems;
