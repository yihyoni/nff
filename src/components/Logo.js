import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setLeftSidebarToggle,
  setRightSidebarToggle,
} from "../store/sidebarSlice";

function Logo() {
  const dispatch = useDispatch();

  return (
    <div className="image-container">
      <img
        src="/menu-left.svg"
        alt="왼쪽 메뉴"
        className="menu-left menu-icon"
        onMouseEnter={() => dispatch(setLeftSidebarToggle(true))}
        onMouseLeave={() => dispatch(setLeftSidebarToggle(false))}
      />
      <Link to="/">
        <img
          src="https://yihyoni.github.io/nff_product/logo.svg"
          alt="메인 로고"
          className="main-logo"
        />
      </Link>
      <img
        src="/menu-right.svg"
        alt="오른쪽 메뉴"
        className="menu-right menu-icon"
        onMouseEnter={() => dispatch(setRightSidebarToggle(true))}
        onMouseLeave={() => dispatch(setRightSidebarToggle(false))}
      />
    </div>
  );
}

export default Logo;
