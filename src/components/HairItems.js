import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function HairItems({ currentPage, itemsPerPage, updateTotalPages }) {
  const [originalData, setOriginalData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);

  useEffect(() => {
    axios
      .get("https://yihyoni.github.io/nff_product/hair.json")
      .then((response) => {
        const sorted = [...response.data].sort((a, b) => a.id - b.id); // 오름차순 정렬
        setOriginalData(sorted); // 원본 저장
        setVisibleData(sorted);

        // 총 페이지 수 계산 및 업데이트
        const totalPages = Math.ceil(sorted.length / itemsPerPage);
        updateTotalPages(totalPages); // 부모 컴포넌트에 페이지 수 업데이트
      })
      .catch(() => {
        console.log("실패함");
      });
  }, [itemsPerPage]);

  if (visibleData.length === 0) {
    return <p>LOADING...</p>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = visibleData.slice(startIndex, endIndex);

  return (
    <div className="item-container">
      {currentItems.map((a) => {
        return (
          <div key={a.id} className="item">
            <Link to={`/detail/hair/${a.id}`}>
              <div className="overlay-wrap">
                <div className="overlay">
                  <p>{a.title}</p>
                  <p>{a.price}</p>
                </div>
              </div>

              <img
                src={`https://yihyoni.github.io/nff_product/hair/hair${a.id}.jpg`}
                alt={a.title}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default HairItems;
