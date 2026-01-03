import { useEffect, useState } from "react";
import "./style/main.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import FingerPage from "./pages/FingerPage";
import NeckPage from "./pages/NeckPage";
import HairPage from "./pages/HairPage";
import CartPage from "./pages/CartPage";
import WishListPage from "./pages/WishListPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import { useSelector } from "react-redux";

function App() {
  // 페이지 상태 정의
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

  // 페이지 변경 함수
  // 확장성과 재사용성 때문에 상태변경함수 안쓰고 함수로 따로 생성
  function handlePageChange(page) {
    setCurrentPage(page); // 페이지를 변경할 때 상태를 업데이트
  }

  // 총 페이지 수 업데이트
  function updateTotalPages(pages) {
    setTotalPages(pages);
  }

  // 페이지
  const [currentCategory, setCurrentCategory] = useState("fingers");

  // 카테고리 변경 시 페이지를 1로 리셋하는 useEffect
  useEffect(() => {
    setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 리셋
  }, [currentCategory]);

  // 카테고리 변경 핸들러
  function handleCategoryChange(category) {
    setCurrentCategory(category);
  }
  const LoggedIn = useSelector((state) => state.user.LoggedIn);

  return (
    <Routes>
      {/* 메인페이지 */}
      <Route
        path="/"
        element={<MainPage handleCategoryChange={handleCategoryChange} />}
      />

      {/* shop 주소 접속시 메인페이지로 이동 */}
      <Route path="/shop" element={<Navigate to="/" replace />} />

      {/*  각 상품 카테고리 경로*/}
      <Route
        path="/shop/fingers"
        element={
          <FingerPage
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            updateTotalPages={updateTotalPages}
            handleCategoryChange={handleCategoryChange}
          />
        }
      />
      <Route
        path="/shop/hair"
        element={
          <HairPage
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            updateTotalPages={updateTotalPages}
            handleCategoryChange={handleCategoryChange}
          />
        }
      />
      <Route
        path="/shop/necklace"
        element={
          <NeckPage
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            updateTotalPages={updateTotalPages}
            handleCategoryChange={handleCategoryChange}
          />
        }
      />

      {/* 장바구니 경로 */}
      <Route
        path="/cart"
        element={<CartPage handleCategoryChange={handleCategoryChange} />}
      />

      {/* 위시리스트 경로 */}
      <Route
        path="/wishlist"
        element={
          LoggedIn ? (
            <WishListPage handleCategoryChange={handleCategoryChange} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* 상세페이지 경로 */}
      <Route
        path="/detail/:category/:id"
        element={<DetailPage handleCategoryChange={handleCategoryChange} />}
      />

      {/* 로그인 페이지 경로 */}
      <Route
        path="/login"
        element={<LoginPage handleCategoryChange={handleCategoryChange} />}
      />

      {/* 검색창 결과 경로 */}
      <Route
        path="search"
        element={<SearchPage handleCategoryChange={handleCategoryChange} />}
      ></Route>

      {/* 그 외 주소 경로 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
