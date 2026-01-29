import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    currentPage: 1, // 현재 페이지 상태
    totalPages: 1, // 전체 페이지 수
    currentCategory: "fingers", // 현재 선택된 카테고리
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
      state.currentPage = 1; // 카테고리 바뀌면 페이지 초기화
    },
  },
});

export const { setCurrentPage, setTotalPages, setCurrentCategory } =
  pageSlice.actions;

export default pageSlice.reducer;
