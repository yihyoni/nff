import { createSlice } from "@reduxjs/toolkit";

// 장바구니
let cart = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    // 상품 추가 및 수량 증가 - 이미 있으면 수량 증가, 없으면 상품 추가
    addCartItem: function (state, action) {
      const found = state.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.category === action.payload.category
        // id + category + size 기준으로 동일 상품 판단
      );
      if (found) {
        found.count++;
      } else {
        state.push(action.payload);
      }
    },

    // 상품 삭제
    removeCartItem: function (state, action) {
      const { id, category, size } = action.payload;

      return state.filter(
        (item) =>
          !(item.id === id && item.category === category && item.size === size)
      );
    },

    // 단순한 수량 증가 + 버튼
    addCount: function (state, action) {
      let 수량 = state.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.category === action.payload.category &&
          item.size === action.payload.size
        // 사이즈 있는 경우만 해당
        // size가 없으면 undefined === undefined
      );

      if (수량 !== -1) {
        state[수량].count++;
      }
    },

    // 단순한 수량 감소 - 버튼
    decreaseCount: function (state, action) {
      let 수량 = state.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.category === action.payload.category &&
          item.size === action.payload.size
      );

      if (수량 !== -1 && state[수량].count > 1) {
        state[수량].count--;
      }
    },

    // 장바구니 비우기
    clearCart: function () {
      return [];
    },

    // 반지 사이즈 상태 업데이트
    updateItemSize: (state, action) => {
      const { id, size } = action.payload; // 객체 { id: item.id, size: selectedSize }
      const found = state.find((item) => item.id === id);

      if (found) {
        found.size = size;
      } // 선택한 상품의 사이즈 업데이트
    },
  },
});

export const {
  addCartItem,
  addCount,
  decreaseCount,
  removeCartItem,
  clearCart,
  updateItemSize,
} = cart.actions;

export default cart.reducer;
