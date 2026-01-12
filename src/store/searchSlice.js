import { createSlice } from "@reduxjs/toolkit";

let search = createSlice({
  name: "search",
  initialState: {
    isSearchOpen: false, // 검색창 원래 닫혀있는 상태로 유지
    searchTerm: "", // 검색창에 입력된 검색어 (빈 값으로 시작)
  },
  reducers: {
    // 검색창 열기/닫기
    setSearchOpen: (state, action) => {
      state.isSearchOpen = action.payload;
    },
    // 입력한 검색어 값 담기 (검색어 저장 - 검색어 상태 업데이트)
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    // 검색어 초기화 + 검색창 닫기
    clearSearch: (state) => {
      state.searchTerm = "";
      state.isSearchOpen = false;
    },
  },
});

export const { setSearchOpen, setSearchTerm, clearSearch } = search.actions;
export default search.reducer;
