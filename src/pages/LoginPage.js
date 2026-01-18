import { useSelector } from "react-redux";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import Header from "../components/Header";
import SearchOverlay from "../components/SearchOverlay";
import LoginContent from "../components/LoginContent";
import Logo from "../components/Logo";
import Footer from "../components/Footer";

function LoginPage(props) {
  //  Redux에서 검색창 열림 여부 가져오기
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);

  return (
    <div className="wrapper">
      {/* 검색창 띄우기 */}
      {isSearchOpen && <SearchOverlay />}
      <Header />

      <div className="container">
        <LeftSidebar handleCategoryChange={props.handleCategoryChange} />

        <main>
          <Logo />
          <LoginContent />
          <Footer />
        </main>

        <RightSidebar />
      </div>
    </div>
  );
}
export default LoginPage;
