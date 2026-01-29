import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTotalPages } from "../store/pageSlice";

function ProductItems({ category }) {
  const dispatch = useDispatch();

  // 현재 페이지 상태
  const currentPage = useSelector((state) => state.page.currentPage);

  // 한 페이지에 보여줄 개수
  const itemsCount = 9;

  // 상품 목록 담을 그릇 - 초기값으로 빈 배열 설정
  // 원본과 화면에 보여줄 데이터를 분리해서 상태로 관리
  const [originalData, setOriginalData] = useState([]); // 상품 원본 보관용
  const [visibleData, setVisibleData] = useState([]); // 사용자한테 보여줄 상품 데이터

  // 상품 데이터(외부데이터) 갖고오기 - 처음 화면에 나타날 때만 실행
  useEffect(() => {
    axios
      .get(`https://yihyoni.github.io/nff_product/${category}.json`)
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
  }, [category]);

  // 처음에 데이터 없는 상태라 빈배열인 경우 오류 방지
  if (visibleData.length === 0) {
    return <p>LOADING...</p>;
  }

  // 현재 페이지의 시작 인덱스
  const startIndex = (currentPage - 1) * itemsCount;
  // 끝 인덱스
  const endIndex = startIndex + itemsCount;
  // 현재 페이지에 맞는 상품들만 선택
  const currentItems = visibleData.slice(startIndex, endIndex);

  return (
    <div className="item-container">
      {/* 해당 상품의 id로 상품 보여주기 */}
      {currentItems.map((a) => {
        return (
          <div key={a.id} className="item">
            {/* 상품 이미지 클릭 시 해당 상품 페이지로 이동 */}
            <Link to={`/detail/${category}/${a.id}`}>
              <div className="overlay-wrap">
                <div className="overlay">
                  <p>{a.title}</p>
                  <p>{a.price}</p>
                </div>
              </div>

              <img
                src={`https://yihyoni.github.io/nff_product/${category}/${category}${a.id}.jpg`}
                alt={a.title}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ProductItems;
