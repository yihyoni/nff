import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isSearchOpen: false, // 검색창 원래 닫혀있는 상태로 유지
  searchTerm: "",
};

let search = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchOpen: (state, action) => {
      state.isSearchOpen = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSearch: (state) => {
      state.searchTerm = "";
      state.isSearchOpen = false;
    },
  },
});

export const { setSearchOpen, setSearchTerm, clearSearch } = search.actions;
export default search.reducer;
