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
            // 현재 페이지에서 하나 이전 페이지로 이동. 현재 page 값 업데이트
          } // currentPage(현재 페이지) > 1인 경우에만 실행
        }}
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </span>

      {/* 페이지 번호 목록 */}
      {/* 페이지 수(totalPages)만큼 배열 생성 */}
      <ol>
        {Array.from({ length: totalPages }, (_, i) => (
          <li
            key={i}
            onClick={() => changePage(i + 1)} //App.js에서 handlePageChange 함수로 연결
            // 페이지 번호 클릭 시 실행
            style={{
              cursor: "pointer",
              fontWeight: currentPage === i + 1 ? "bold" : "normal",
            }} // 현재 페이지는 굵게 표시
            //currentPage가 1이면 → i === 0인 li가 bold
          >
            <span>{i + 1}</span>
            {/* 사용자에게는 1, 2, 3으로 보이게 */}
          </li>
        ))}
      </ol>

      {/* 다음 페이지 버튼 */}
      <span
        onClick={() => {
          if (currentPage < totalPages) {
            changePage(currentPage + 1);
          } // 현재 페이지가 전체 페이지보다 작으면 현재 페이지 기준으로 다음페이지로 이동
        }}
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </span>
    </div>
  );
}

export default Pagination;
