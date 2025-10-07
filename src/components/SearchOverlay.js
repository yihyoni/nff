import { useDispatch } from "react-redux";
import { setSearchOpen, setSearchTerm } from "../store/searchSlice";
import { useState } from "react";

function SearchOverlay() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  // 로컬 상태로 입력 추적

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(setSearchTerm(inputValue)); // 검색어 저장
      dispatch(setSearchOpen(false)); // 검색창 닫기
    }
  };

  return (
    <div className="search-container">
      <div
        className="search-overlay"
        onClick={() => dispatch(setSearchOpen(false))} // 검색창 닫기
      ></div>

      <div className="search">
        <input
          type="text"
          className="search-box"
          placeholder="Press Enter to Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  );
}

export default SearchOverlay;
