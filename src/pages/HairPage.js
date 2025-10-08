import { useSelector } from "react-redux";
import Header from "../components/Header";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import SearchOverlay from "../components/SearchOverlay";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import HairItems from "../components/HairItems";
import Logo from "../components/Logo";

function HairPage(props) {
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
        <LeftSidebar handleCategoryChange={props.handleCategoryChange} />

        {/* 중앙 메인 콘텐츠 */}
        <main>
          <Logo />
          {/* items */}
          <HairItems
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
        <RightSidebar />
      </div>
    </div>
  );
}

export default HairPage;
