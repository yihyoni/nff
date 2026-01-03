import Header from "../components/Header";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import SearchOverlay from "../components/SearchOverlay";
import WishListContent from "../components/WishListContent";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function WishListPage(props) {
  // Redux에서 검색창 열림 여부 가져오기
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);

  const LoggedIn = useSelector((state) => state.user.LoggedIn);
  const navigate = useNavigate();

  // 위시리스트 페이지에 로그인 안 한 사용자가 들어오려고 하면 막기
  // 컴포넌트가 렌더링되면 → useEffect()가 실행됨
  useEffect(() => {
    if (!LoggedIn) {
      alert("로그인 후 이용해주세요!");
      navigate("/login"); // 로그인 페이지로 이동
    }
  }, [LoggedIn]);

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
        {LoggedIn && <WishListContent />}

        {/* 우측 aside */}
        <RightSidebar />
      </div>
    </div>
  );
}
export default WishListPage;
