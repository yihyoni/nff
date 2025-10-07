import { useSelector } from "react-redux";
import Header from "../components/Header";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import SearchOverlay from "../components/SearchOverlay";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import NeckItems from "../components/NeckItems";
import Logo from "../components/Logo";

function NeckPage(props) {
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);

  return (
    <div className="wrapper">
      {/* 검색창 */}
      {isSearchOpen && <SearchOverlay />}

      {/* 헤더 */}
      <Header />

      {/* 컨테이너 시작 */}
      <div className="container">
        {/* 왼쪽 aside */}
        <LeftSidebar
          className={props.leftSidebarToggle ? "open" : ""}
          // setSearch={props.setSearch}
          setIsShopHovered={props.setIsShopHovered}
          isShopHovered={props.isShopHovered}
          setIsBoardHovered={props.setIsBoardHovered}
          isBoardHovered={props.isBoardHovered}
          handleCategoryChange={props.handleCategoryChange}
          setLeftSidebarToggle={props.setLeftSidebarToggle}
        />

        {/* 중앙 메인 콘텐츠 */}
        <main>
          <Logo
            setLeftSidebarToggle={props.setLeftSidebarToggle}
            setRightSidebarToggle={props.setRightSidebarToggle}
          />
          {/* items */}
          <NeckItems
            currentPage={props.currentPage}
            itemsPerPage={9}
            updateTotalPages={props.updateTotalPages}
          />
          {/* pages */}
          <Pagination
            currentPage={props.currentPage}
            totalPages={props.totalPages}
            onPageChange={props.onPageChange}
          />
          {/* Footer */}
          <Footer />
        </main>

        {/* 우측 aside */}
        <RightSidebar
          className={props.rightSidebarToggle ? "open" : ""}
          setRightSidebarToggle={props.setRightSidebarToggle}
        />
      </div>
    </div>
  );
}

export default NeckPage;
