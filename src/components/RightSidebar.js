import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRightSidebarToggle } from "../store/sidebarSlice";

function RightSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 왼쪽 사이드바 열기
  const rightSidebarToggle = useSelector(
    (state) => state.sidebar.rightSidebarToggle
  );

  // 로그인 여부 갖고오기
  const LoggedIn = useSelector((state) => state.user.LoggedIn);

  return (
    <aside
      className={`sidebar sidebar-right  ${rightSidebarToggle ? "open" : ""}`}
      onMouseEnter={() => dispatch(setRightSidebarToggle(true))}
      onMouseLeave={() => dispatch(setRightSidebarToggle(false))}
    >
      <ul className="category">
        <li>
          <Link to="/login">LOGIN</Link>
        </li>
        <li>
          <Link to="/cart">CART</Link>
        </li>
        <li>
          <Link to="/">ORDER</Link>
        </li>
        <li>
          <button
            onClick={() => {
              if (!LoggedIn) {
                alert("로그인 후 이용해주세요");
                navigate("/login"); // 비로그인 상태 - 로그인페이지로 이동
              } else {
                navigate("/wishlist"); // 로그인 상태 - 위시리스트페이지 접속가능
              }
            }}
          >
            WISH LIST
          </button>
        </li>
        <li>
          <Link to="/">MY PAGE</Link>
        </li>
      </ul>
    </aside>
  );
}

export default RightSidebar;
