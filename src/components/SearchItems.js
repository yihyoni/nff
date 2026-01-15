import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Footer from "./Footer";
import Logo from "./Logo";
import { setAllProducts } from "../store/productSlice";
import axios from "axios";
import { Link } from "react-router-dom";

function SearchItems() {
  const dispatch = useDispatch();
  // 전체 상품 데이터 저장
  const allProducts = useSelector((state) => state.products.allProducts);
  // 로딩중 보여주기 중단
  const isLoading = useSelector((state) => state.products.isLoading);
  // 검색창에 입력된 검색어
  const searchTerm = useSelector((state) => state.search.searchTerm);

  // 상품 불러오기 (최초 진입 시 1번만)
  useEffect(() => {
    // 모든 카테고리에서 검색하려면 여러 JSON을 불러오기
    const categories = ["hair", "fingers", "necklace"]; // 모든 카테고리
    const promises = categories.map((category) =>
      axios
        .get(`https://yihyoni.github.io/nff_product/${category}.json`)
        .then((res) =>
          res.data.map((item) => ({
            ...item,
            category,
            // category 속성 추가 - 근데 왜 추가해줘야하지
            // 어떤 상품이 어떤 카테고리에서 왔는지 구별이 안 돼서
            // 축약형 (category: category)
            // 받아온 상품 데이터(res.data)의 각각 요소(item)에다가
            // category 값을 추가해서, 새롭게 가공된 배열을 만드는 것
          }))
        )
    );

    // 전체 아이템 배열 합치기
    Promise.all(promises)
      .then((results) => {
        const allItems = results.flat(); // 배열 펼치기
        dispatch(setAllProducts(allItems));
      })
      .catch((err) => {
        console.error("상품 데이터 불러오기 실패", err);
      });
  }, []);

  // 로딩중
  if (isLoading) {
    return <p>LOADING... 상품을 불러오는 중입니다!</p>;
  }
  // 데이터 불러오기 했는데 상품이 없는 경우
  if (allProducts.length === 0) return <p>상품 없음</p>;

  // // 필터링
  // const filteredItems = allProducts.filter((item) =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

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
