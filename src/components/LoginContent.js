import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/userSlice";
import { useState } from "react";

function LoginContent() {
  const dispatch = useDispatch();

  // 사용자 로그인 여부 확인
  const LoggedIn = useSelector((state) => state.user.LoggedIn);
  const info = useSelector((state) => state.user.info);
  const [id, setId] = useState(""); // 유저 이름 입력 값 저장
  const [password, setPassword] = useState(""); // 비번 입력 값 저장

  // 로그인 실행
  const handleLogin = () => {
    // 사용자가 입력한 값이 공백인 지 검사
    if (id.trim() === "" || password.trim() === "") {
      alert("아이디와 비밀번호를 입력해주세요.");
    } else {
      dispatch(login({ name: id, pw: password }));
      alert(`${id}님 로그인 되었습니다.`);
    }
  };

  // 로그아웃 실행
  const handleLogout = () => {
    dispatch(logout()); // 로그아웃
    alert("로그아웃 되었습니다.");
  };

  return (
    <>
      {/* 로그인 됐을 때 실행 */}
      {LoggedIn ? (
        <div className="welcome-container">
          <h3 className="welcome-message">{info.name}님 환영합니다.</h3>
          <button className="logout-button" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      ) : (
        //로그인 상태 아닐 때
        <div className="login-container">
          <h3 className="login-title">회원정보</h3>
          <input
            className="login-input"
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)} // id 업데이트
          />
          <input
            className="login-input"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // pw 업데이트
          />
          <button className="login-button" onClick={handleLogin}>
            로그인하기
          </button>
        </div>
      )}
    </>
  );
}

export default LoginContent;
