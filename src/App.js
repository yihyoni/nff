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
  // 로그인 상태 여부 갖고옴 - 위시리스트 접속시 로그인 여부 확인 필요
  const LoggedIn = useSelector((state) => state.user.LoggedIn);

  return (
    <Routes>
      {/* 메인페이지 */}
      <Route path="/" element={<MainPage />} />

      {/* 로그인 페이지 */}
      <Route path="/login" element={<LoginPage />} />

      {/* 검색창 페이지 */}
      <Route path="/search" element={<SearchPage />}></Route>

      {/* shop 주소 접속시 메인페이지로 이동 */}
      <Route path="/shop" element={<Navigate to="/" replace />} />
      {/* 상품 카테고리 페이지*/}
      <Route path="/shop/fingers" element={<FingerPage />} />
      <Route path="/shop/hair" element={<HairPage />} />
      <Route path="/shop/necklace" element={<NeckPage />} />

      {/* 장바구니 페이지 */}
      <Route path="/cart" element={<CartPage />} />

      {/* 위시리스트 페이지  - 로그인이 되어야만 접근 가능 */}
      <Route
        path="/wishlist"
        element={LoggedIn ? <WishListPage /> : <Navigate to="/login" replace />}
      />

      {/* 상세페이지 */}
      <Route path="/detail/:category/:id" element={<DetailPage />} />
      {/* 상세페이지는 공통 컴포넌트 하나로 처리하고, 
      URL 파라미터로 카테고리명과 상품 id를 함께 넘겨줌 */}

      {/* 잘못된 주소 → 메인페이지로 이동 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
