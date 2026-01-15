import { useDispatch } from "react-redux";
import { setSearchOpen, setSearchTerm } from "../store/searchSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOverlay() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 검색어 요소 값 담기
  // 사용자가 지금 입력하고 있는 글자 저장
  const [inputValue, setInputValue] = useState("");

  // 엔터 키 눌렀을 때 실행되는 함수
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // 엔터키 눌렀을 때
      dispatch(setSearchTerm(inputValue)); // 검색어 저장
      dispatch(setSearchOpen(false)); // 검색창 닫기
      navigate("/search"); // 검색 결과 페이지로 이동
    }
  };

  return (
    <div className="search-content">
      {/* 검색창 외부 배경 */}
      <div
        className="search-overlay"
        onClick={() => dispatch(setSearchOpen(false))} // 배경 클릭하면 검색창 닫기
      ></div>

      {/* 검색창 */}
      <div className="search">
        <input
          type="text"
          className="search-box"
          placeholder="Press Enter to Search"
          value={inputValue} // 타이핑 한 요소값 보여주기
          onChange={(e) => setInputValue(e.target.value)} // 타이핑한 요소값 저장
          onKeyDown={handleKeyPress} // 사용자가 키 누를 때 handlekeyPress 실행
        />
      </div>
    </div>
  );
}

export default SearchOverlay;
