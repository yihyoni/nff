import { useSelector } from "react-redux";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import MainContent from "../components/MainContent";
import Header from "../components/Header";
import SearchOverlay from "../components/SearchOverlay";

function MainPage(props) {
  // 🔥 Redux 상태에서 검색창 열림 여부 가져오기
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);
  return (
    <div className="wrapper">
      {/* 검색창 띄우기: Redux 상태로 조건부 렌더링 */}
      {isSearchOpen && <SearchOverlay />}

      <Header />

      <div className="container">
        {/* 왼쪽 사이드바: className에 open 여부 전달 */}
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

        {/* 메인 콘텐츠: 사이드바 열기 함수 전달 */}
        <MainContent
          setLeftSidebarToggle={props.setLeftSidebarToggle}
          setRightSidebarToggle={props.setRightSidebarToggle}
        />

        <RightSidebar
          className={props.rightSidebarToggle ? "open" : ""}
          setRightSidebarToggle={props.setRightSidebarToggle}
        />
      </div>
    </div>
  );
}

export default MainPage;
