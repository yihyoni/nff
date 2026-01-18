import { useSelector } from "react-redux";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import SearchItems from "../components/SearchItems";
import Header from "../components/Header";
import SearchOverlay from "../components/SearchOverlay";
import Logo from "../components/Logo";
import Footer from "../components/Footer";

function SearchPage(props) {
  // Redux에서 검색창 열림 여부 가져오기
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);

  return (
    <div className="wrapper">
      {isSearchOpen && <SearchOverlay />}

      <Header />

      <div className="container">
        {/* 왼쪽 aside */}
        <LeftSidebar handleCategoryChange={props.handleCategoryChange} />

        <main>
          <Logo />
          {/* 검색결과 불러오기 */}
          <SearchItems />
          <Footer />
        </main>

        {/* 우측 aside */}
        <RightSidebar />
      </div>
    </div>
  );
}
export default SearchPage;
