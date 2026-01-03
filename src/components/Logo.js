import { Link } from "react-router-dom";

function Logo(props) {
  return (
    <div className="image-container">
      <img
        src="/menu-left.svg"
        alt="왼쪽 메뉴"
        className="menu-left menu-icon"
        onMouseEnter={() => props.setLeftSidebarToggle(true)}
        onMouseLeave={() => props.setLeftSidebarToggle(false)}
      />
      <Link to="/">
        <img
          src="https://yihyoni.github.io/nff_product/logo.svg"
          alt="로고"
          className="main-logo"
        />
      </Link>
      <img
        src="/menu-right.svg"
        alt="오른쪽 메뉴"
        className="menu-right menu-icon"
        onMouseEnter={() => props.setRightSidebarToggle(true)}
        onMouseLeave={() => props.setRightSidebarToggle(false)}
      />
    </div>
  );
}

export default Logo;
