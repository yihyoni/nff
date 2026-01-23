import { Link } from "react-router-dom";
import { setSearchOpen } from "../store/searchSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  setLeftSidebarToggle,
  setIsShopHovered,
  setIsBoardHovered,
} from "../store/sidebarSlice";
import { setCurrentCategory } from "../store/pageSlice";

function LeftSidebar() {
  const dispatch = useDispatch();

  // 왼쪽 사이드바 열기
  const leftSidebarToggle = useSelector(
    (state) => state.sidebar.leftSidebarToggle
  );
  // 왼쪽 카테고리 열기 (2개로 구분)
  const isShopHovered = useSelector((state) => state.sidebar.isShopHovered);
  const isBoardHovered = useSelector((state) => state.sidebar.isBoardHovered);

  return (
    <aside
      className={`sidebar sidebar-left ${leftSidebarToggle ? "open" : ""}`}
      onMouseEnter={() => dispatch(setLeftSidebarToggle(true))} // 열기
      onMouseLeave={() => dispatch(setLeftSidebarToggle(false))} // 닫기
      // 마우스가 사이드바를 벗어나야 닫히게 토글
      // 해당 사이드바 위에 마우스를 올리면 true 니까 계속 열린 상태라서 닫기도 추가
    >
      <ul className="category">
        <li onClick={() => dispatch(setSearchOpen(true))}>
          <Link to="#">SEARCH</Link>
        </li>
        <li
          onMouseEnter={() => dispatch(setIsShopHovered(true))}
          onMouseLeave={() => dispatch(setIsShopHovered(false))}
          className="dropdown"
        >
          <Link to="/">SHOP</Link>
          {isShopHovered && (
            <ul className="dropdown-content">
              <li onClick={() => dispatch(setCurrentCategory("hair"))}>
                <Link to="/shop/hair">for hair</Link>
              </li>
              <li onClick={() => dispatch(setCurrentCategory("neck"))}>
                <Link to="/shop/necklace">for neck</Link>
              </li>
              <li onClick={() => dispatch(setCurrentCategory("fingers"))}>
                <Link to="/shop/fingers">for fingers</Link>
              </li>
            </ul>
          )}
        </li>
        <li
          onMouseOver={() => dispatch(setIsBoardHovered(true))} // 열기
          onMouseOut={() => dispatch(setIsBoardHovered(false))} // 닫기
          className="dropdown"
        >
          <Link to="/">BOARD</Link>
          {isBoardHovered && (
            <ul className="dropdown-content">
              <li>
                <Link to="/notice">notice</Link>
              </li>
              <li>
                <Link to="/q-a">q / a</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
}

export default LeftSidebar;
