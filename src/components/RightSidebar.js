import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRightSidebarToggle } from "../store/sidebarSlice";

function RightSidebar() {
  const dispatch = useDispatch();
  const LoggedIn = useSelector((state) => state.user.LoggedIn);
  const rightSidebarToggle = useSelector(
    (state) => state.sidebar.rightSidebarToggle
  );
  const navigate = useNavigate();

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
                navigate("/login");
              } else {
                navigate("/wishlist");
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
