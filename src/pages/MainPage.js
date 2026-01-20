import { useSelector } from "react-redux";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import MainContent from "../components/MainContent";
import Header from "../components/Header";
import SearchOverlay from "../components/SearchOverlay";
import Logo from "../components/Logo";
import Footer from "../components/Footer";

function MainPage() {
  // Redux 상태에서 검색창 열림 여부 가져오기
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);

  return (
    <div className="wrapper">
      {/* 검색창 띄우기*/}
      {isSearchOpen && <SearchOverlay />}

      <Header />

      <div className="container">
        <LeftSidebar />
        <main>
          <Logo />
          <MainContent />
          <Footer />
        </main>
        <RightSidebar />
      </div>
    </div>
  );
}

export default MainPage;
