import { createSlice } from "@reduxjs/toolkit";

let sidebar = createSlice({
  name: "sidebar",
  initialState: {
    leftSidebarToggle: false,
    rightSidebarToggle: false,
    isShopHovered: false,
    isBoardHovered: false,
  },
  reducers: {
    setLeftSidebarToggle: (state, action) => {
      state.leftSidebarToggle = action.payload;
    },
    setRightSidebarToggle: (state, action) => {
      state.rightSidebarToggle = action.payload;
    },
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
