import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Footer from "./Footer";
import Logo from "./Logo";
import { setAllProducts } from "../store/productSlice";
import axios from "axios";
import { Link } from "react-router-dom";

function SearchItems() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.allProducts);
  const isLoading = useSelector((state) => state.products.isLoading);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  // 상품 불러오기 (최초 진입 시 1번만)
  useEffect(() => {
    if (allProducts.length > 0) return; // 이미 불러왔으면 무시

    const categories = ["hair", "fingers", "necklace"];
    const promises = categories.map((category) =>
      axios
        .get(`https://kku-git.github.io/nff_product/${category}.json`)
        .then((res) =>
          res.data.map((item) => ({
            ...item,
            category,
          }))
        )
    );

    Promise.all(promises)
      .then((results) => {
        const allItems = results.flat();
        dispatch(setAllProducts(allItems));
      })
      .catch((err) => {
        console.error("상품 데이터 불러오기 실패", err);
      });
  }, [allProducts.length]);

  // 로딩중
  if (isLoading) {
    return <p>🔄 LOADING... 상품을 불러오는 중입니다!</p>;
  }

  // 필터링
  const filteredItems = allProducts.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <Logo />

      {/* 검색아이템 */}
      <div className="search-container">
        <p className="search-title">SEARCH</p>

        <div className="search-items">
          {/* 장바구니 아이템 1 */}
          <div className="search-item">
            <div className="search-image">
              <img src="/black-ring.jpg" alt="black-ring" />
            </div>
            <div className="item-info">
              <p className="search-name">black-ring</p>
              <p className="item-price">KRW 48,000</p>
            </div>
          </div>
          {/* 장바구니 아이템 2 */}
          <div className="search-item">
            <div className="search-image">
              <img src="/black-ring.jpg" alt="black-ring" />
            </div>
            <div className="item-info">
              <p className="item-name">black-ring</p>
              <p className="item-price">KRW 48,000</p>
            </div>
          </div>
          {/* 장바구니 아이템 3 */}
          <div className="search-item">
            <div className="search-image">
              <img src="/black-ring.jpg" alt="black-ring" />
            </div>
            <div className="item-info">
              <p className="item-name">black-ring</p>
              <p className="item-price">KRW 48,000</p>
            </div>
          </div>{" "}
          {/* 장바구니 아이템 4 */}
          <div className="search-item">
            <div className="search-image">
              <img src="/black-ring.jpg" alt="black-ring" />
            </div>
            <div className="item-info">
              <p className="item-name">black-ring</p>
              <p className="item-price">KRW 48,000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default SearchItems;
