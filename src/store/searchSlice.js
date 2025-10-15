import { createSlice } from "@reduxjs/toolkit";

let search = createSlice({
  name: "search",
  initialState: {
    isSearchOpen: false, // 검색창 원래 닫혀있는 상태로 유지
    searchTerm: "",
  },
  reducers: {
    // 검색창 열고 닫기
    setSearchOpen: (state, action) => {
      state.isSearchOpen = action.payload;
    },
    // 검색어 값 담기
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    // 검색창 닫기 + 초기화
    clearSearch: (state) => {
      state.searchTerm = "";
      state.isSearchOpen = false;
    },
  },
});

export const { setSearchOpen, setSearchTerm, clearSearch } = search.actions;
export default search.reducer;
