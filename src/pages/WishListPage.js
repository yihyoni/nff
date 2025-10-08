import Header from "../components/Header";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import SearchOverlay from "../components/SearchOverlay";
import WishListContent from "../components/WishListContent";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function WishListPage(props) {
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);

  const LoggedIn = useSelector((state) => state.user.LoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!LoggedIn) {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
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
