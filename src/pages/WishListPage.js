import Header from "../components/Header";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import SearchOverlay from "../components/SearchOverlay";
import WishListContent from "../components/WishListContent";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../components/Logo";
import Footer from "../components/Footer";

function WishListPage() {
  const navigate = useNavigate();

  // Redux에서 검색창 열림 여부 가져오기
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);

  // 로그인 상태 갖고오기 - 로그인 된 상태인 지 아닌 지 확인
  const LoggedIn = useSelector((state) => state.user.LoggedIn);

  // 위시리스트 페이지에 접속 시, 로그인 안 한 사용자가 들어오려고 하면 막기
  // 로그인 후 이용 가능
  useEffect(() => {
    if (!LoggedIn) {
      alert("로그인 후 이용해주세요!");
      navigate("/login"); // 로그인 안 된 상태 - 로그인 페이지로 이동
    }
  }, [LoggedIn]); // 렌더 직후 로그인 상태를 검사해 접근을 제어

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

        <main>
          <Logo />
          {/* 로그인 상태일 경우만 컴포넌트 보여줌 */}
          {LoggedIn && <WishListContent />}
          <Footer />
        </main>
        {/* 우측 aside */}
        <RightSidebar />
      </div>
    </div>
  );
}
export default WishListPage;
