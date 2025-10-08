import Footer from "./Footer";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/userSlice";
import { useState } from "react";

function LoginContent(props) {
  const dispatch = useDispatch();
  const LoggedIn = useSelector((state) => state.user.LoggedIn);
  const info = useSelector((state) => state.user.info);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (id.trim() === "" || password.trim() === "") {
      alert("아이디와 비밀번호를 입력해주세요.");
    } else {
      dispatch(login({ name: id, pw: password }));
      alert(`${id}님 로그인 되었습니다.`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    alert("로그아웃 되었습니다.");
  };

  return (
    <main>
      <Logo />
      {LoggedIn ? (
        <div className="welcome-container">
          <h3 className="welcome-message">{info.name}님 환영합니다.</h3>
          <button className="logout-button" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      ) : (
        <div className="login-container">
          <h3 className="login-title">회원정보</h3>
          <input
            className="login-input"
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>
            로그인하기
          </button>
        </div>
      )}

      <Footer />
    </main>
  );
}

export default LoginContent;
