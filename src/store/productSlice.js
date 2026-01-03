import { createSlice } from "@reduxjs/toolkit";

const products = createSlice({
  name: "products",
  initialState: {
    allProducts: [], // 전체 상품 데이터 담는 배열
    isLoading: true,
  },
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload; // 전체 상품 데이터 저장
      state.isLoading = false; // 로딩중 보여주기 중단
    },
  },
});

export const { setAllProducts } = products.actions;
export default products.reducer;
