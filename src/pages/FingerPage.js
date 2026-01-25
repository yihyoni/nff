import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import SearchOverlay from "../components/SearchOverlay";
import Pagination from "../components/Pagination";
// import FingerItems from "../components/FingerItems";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import { setCurrentCategory } from "../store/pageSlice";
import ProductItems from "../components/ProductItems";

function FingerPage() {
  const dispatch = useDispatch();

  // Redux에서 검색창 열림 여부 가져오기
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);

  // 해당 카테고리 페이지에 진입했을 시 1번만 실행
  // 카테고리 진입 시 항상 첫 페이지(1페이지)부터 보여주기
  // 페이지 진입 시 카테고리 설정 + 첫 페이지로 초기화
  useEffect(() => {
    dispatch(setCurrentCategory("fingers"));
  }, []);

  return (
    <div className="wrapper">
      {/* 검색창 */}
      {isSearchOpen && <SearchOverlay />}

      {/* 헤더 */}
      <Header />

      {/* 컨테이너 시작 */}
      <div className="container">
        {/* 왼쪽 aside */}
        <LeftSidebar />

        {/* 중앙 메인 콘텐츠 */}
        <main>
          <Logo />

          {/* items */}
          {/* <FingerItems /> */}
          <ProductItems category="fingers" />

          {/* pages */}
          <Pagination />

          {/* Footer */}
          <Footer />
        </main>

        {/* 우측 aside */}
        <RightSidebar />
      </div>
    </div>
  );
}

export default FingerPage;
