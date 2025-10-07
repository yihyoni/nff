import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchOpen } from "../store/searchSlice";

function LeftSidebar(props) {
  const dispatch = useDispatch();

  return (
    <aside
      className={`sidebar sidebar-left ${props.className}`}
      onMouseEnter={() => props.setLeftSidebarToggle(true)}
      onMouseLeave={() => props.setLeftSidebarToggle(false)}
    >
      <ul className="category">
        <li onClick={() => dispatch(setSearchOpen(true))}>
          <Link>SEARCH</Link>
        </li>
        <li
          onMouseEnter={() => props.setIsShopHovered(true)}
          onMouseLeave={() => props.setIsShopHovered(false)}
          className="dropdown"
        >
          <Link to="/">SHOP</Link>
          {props.isShopHovered && (
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
          onMouseOver={() => props.setIsBoardHovered(true)}
          onMouseOut={() => props.setIsBoardHovered(false)}
          className="dropdown"
        >
          <Link to="/">BOARD</Link>
          {props.isBoardHovered && (
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
