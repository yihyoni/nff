import { createSlice } from "@reduxjs/toolkit";

let sidebar = createSlice({
  name: "sidebar",
  initialState: {
    //사이드바 열고 닫기 상태
    leftSidebarToggle: false, // 왼쪽 사이드바
    rightSidebarToggle: false, // 오른쪽 사이드바

    //카테고리 열고 닫기 상태
    isShopHovered: false, // "SHOP" 메뉴
    isBoardHovered: false, // "BOARD" 메뉴
  },
  reducers: {
    setLeftSidebarToggle: (state, action) => {
      state.leftSidebarToggle = action.payload;
    },
    setRightSidebarToggle: (state, action) => {
      state.rightSidebarToggle = action.payload;
    },
    // Shop 을 누르면 Board 부분까지 열리는 문제 해결하기 위해 state 2개로 구분해서 생성
    setIsShopHovered: (state, action) => {
      state.isShopHovered = action.payload;
    },
    setIsBoardHovered: (state, action) => {
      state.isBoardHovered = action.payload;
    },
  },
});

export const {
  setLeftSidebarToggle,
  setRightSidebarToggle,
  setIsShopHovered,
  setIsBoardHovered,
} = sidebar.actions;

export default sidebar.reducer;
