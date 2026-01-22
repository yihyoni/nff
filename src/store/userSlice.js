// src/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: {
    LoggedIn: false, // 처음 시작 - 로그인 안 된 상태
    info: null, // 유저 정보
  },
  reducers: {
    // 로그인 시 실행
    login: (state, action) => {
      state.LoggedIn = true; //로그인된 상태로 변경
      state.info = action.payload; // 유저정보 (이름+비번) 정보 저장
    },
    // 로그아웃 시 실행
    logout: (state) => {
      state.LoggedIn = false; // 로그아웃된 상태로 변경
      state.info = null; // 유저 정보 초기화
    },
  },
});
export const { login, logout } = user.actions;

export default user.reducer;
