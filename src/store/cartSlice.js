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
          // 이건 반지만 해당됨. 이거 좀 거슬림 반지만 해당되는건데 모든 아이템이 다 비교해서
          item.category === action.payload.category
        //  같은 id라도 category가 다를 수 있기 때문에, category까지 비교
      );
      if (found) {
        found.count++;
      } else {
        state.push(action.payload);
      }
    },

    // 상품 삭제
    removeCartItem: function (state, action) {
      return state.filter((item) => item.id !== action.payload);
    },

    // 단순한 수량 증가 + 버튼
    // 번호라는 이름 좀 별로라 고쳐줘야할 듯 - 수량 같은 걸로?
    addCount: function (state, action) {
      let 번호 = state.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.category === action.payload.category &&
          item.size === action.payload.size
        // 사이즈 있는 경우만 해당
        // size가 없으면 undefined === undefined
      );

      // 해당 아이템이 없으면 에러 내지 말고 넘어가기(?)
      // 요소가 실제로 존재한다면, 해당 인덱스를 가진 요소의 수량 +1
      // 해당 조건을 가진 상품 인덱스의 수량 +1
      if (번호 !== -1) {
        state[번호].count++;
      }
    },

    // 단순한 수량 감소 - 버튼
    // 번호라는 이름 좀 별로라 고쳐줘야할 듯 - 수량 같은 걸로
    decreaseCount: function (state, action) {
      let 번호 = state.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.category === action.payload.category &&
          item.size === action.payload.size
      );

      // 수량이 존재하고, 1 이상일 때만 수량 줄이기
      // 해당 조건을 가진 상품 인덱스를 가진 상품의 수량을 -1만큼 줄여주기
      // 인덱스로 상품을 찾고 그 상품의 count 속성에 접근해서 수량을 조절
      if (번호 !== -1 && state[번호].count > 1) {
        state[번호].count--;
      }
    },

    // 장바구니 비우기
    clearCart: function () {
      return [];
    },

    // 반지 사이즈 상태 업데이트
    // 이거 근데 카테고리랑도 비교하게끔 추가로 더 수정해줘야 함.
    updateItemSize: (state, action) => {
      const { id, size } = action.payload; // 객체 { id: item.id, size: selectedSize }
      const found = state.find((item) => item.id === id);
      // 장바구니 안에 있는 값들의 id === 내가 변경하려는 id 상품 찾기

      if (found) {
        found.size = size;
      } // id 값으로 찾은 조건에 맞는 상품의 size 값을 새로 받은 size 값으로 업데이트
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
