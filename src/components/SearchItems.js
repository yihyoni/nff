import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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
  // 검색어 갖고와서 소문자화
  const search = searchTerm?.toLowerCase() || "";

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
            // 어떤 상품이 어떤 카테고리에서 왔는지 구별이 안 돼서 category 속성 추가
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
  }, [dispatch]);

  // 로딩중
  if (isLoading) return <p>로딩중...</p>;

  // 데이터 불러오기 했는데 상품이 없는 경우
  if (allProducts.length === 0) return <p>상품 없음</p>;

  // 검색어 필터링
  const filteredItems = allProducts.filter((item) => {
    const name = item.title?.toLowerCase() || "";
    return name.includes(search);
  });

  return (
    <div className="search-container">
      <p className="search-title">SEARCH</p>

      <div className="search-items">
        {/* 검색된 아이템 */}
        {filteredItems.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          filteredItems.map((item) => {
            return (
              <div className="search-item" key={`${item.category}-${item.id}`}>
                {/* 이미지 클릭 시, 상세페이지로 이동 */}
                <Link to={`/detail/${item.category}/${item.id}`}>
                  <div className="search-image">
                    <img
                      src={`https://yihyoni.github.io/nff_product/${item.category}/${item.category}${item.id}.jpg`}
                      alt={item.title}
                    />
                  </div>
                  <div className="item-info">
                    <p className="item-name">{item.title}</p>
                    <p className="item-price">{item.price}</p>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default SearchItems;
