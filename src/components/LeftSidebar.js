import { Link } from "react-router-dom";
import { setSearchOpen } from "../store/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setLeftSidebarToggle,
  setIsShopHovered,
  setIsBoardHovered,
} from "../store/sidebarSlice";

function LeftSidebar(props) {
  const dispatch = useDispatch();
  const leftSidebarToggle = useSelector(
    (state) => state.sidebar.leftSidebarToggle
  );
  const isShopHovered = useSelector((state) => state.sidebar.isShopHovered);
  const isBoardHovered = useSelector((state) => state.sidebar.isBoardHovered);

  return (
    <aside
      className={`sidebar sidebar-left ${leftSidebarToggle ? "open" : ""}`}
      onMouseEnter={() => dispatch(setLeftSidebarToggle(true))}
      onMouseLeave={() => dispatch(setLeftSidebarToggle(false))}
    >
      <ul className="category">
        <li onClick={() => dispatch(setSearchOpen(true))}>
          <Link>SEARCH</Link>
        </li>
        <li
          onMouseEnter={() => dispatch(setIsShopHovered(true))}
          onMouseLeave={() => dispatch(setIsShopHovered(false))}
          className="dropdown"
        >
          <Link to="/">SHOP</Link>
          {isShopHovered && (
            <ul className="dropdown-content">
              <li onClick={() => props.handleCategoryChange("hair")}>
                <Link to="/shop/hair">for hair</Link>
              </li>
              <li onClick={() => props.handleCategoryChange("neck")}>
                <Link to="/shop/necklace">for neck</Link>
              </li>
              <li onClick={() => props.handleCategoryChange("fingers")}>
                <Link to="/shop/fingers">for fingers</Link>
              </li>
            </ul>
          )}
        </li>
        <li
          onMouseOver={() => dispatch(setIsBoardHovered(true))}
          onMouseOut={() => dispatch(setIsBoardHovered(false))}
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
