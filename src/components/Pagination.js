import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../store/pageSlice";

function Pagination() {
  const dispatch = useDispatch();
  // 현재 페이지 상태
  const currentPage = useSelector((state) => state.page.currentPage);
  // 총 페이지 상태
  const totalPages = useSelector((state) => state.page.totalPages);

  // 현재 페이지 바꾸기
  function changePage(page) {
    dispatch(setCurrentPage(page));
  }

  return (
    <div className="pages">
      {/* 이전 페이지 버튼 */}
      <span
        onClick={() => {
          if (currentPage > 1) {
            changePage(currentPage - 1);
            // 현재 page 값 업데이트
          }
        }}
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </span>

      {/* 페이지 번호 목록 */}
      <ol>
        {Array.from({ length: totalPages }, (_, i) => (
          <li
            key={i}
            onClick={() => changePage(i + 1)}
            style={{
              cursor: "pointer",
              fontWeight: currentPage === i + 1 ? "bold" : "normal",
            }}
          >
            <span>{i + 1}</span>
          </li>
        ))}
      </ol>

      {/* 다음 페이지 버튼 */}
      <span
        onClick={() => {
          if (currentPage < totalPages) {
            changePage(currentPage + 1);
          }
        }}
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </span>
    </div>
  );
}

export default Pagination;
