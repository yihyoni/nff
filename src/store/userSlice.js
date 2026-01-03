// src/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: {
    LoggedIn: false, // 처음 시작 - 로그인 안 된 상태
    info: null, // 유저 정보
  },
  reducers: {
    login: (state, action) => {
      state.LoggedIn = true;
      state.info = action.payload;
    },
    logout: (state) => {
      state.LoggedIn = false;
      state.info = null;
    },
  },
});
export const { login, logout } = user.actions;

export default user.reducer;
// 비밀번호는 아직 구현안됨.
