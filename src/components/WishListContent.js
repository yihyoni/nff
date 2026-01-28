import { useSelector, useDispatch } from "react-redux";
import { removeWishlistItem, clearWishlist } from "../store/wishlistSlice";
import { addCartItem } from "../store/cartSlice";

function WishListContent() {
  const wishListItems = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="wish-container">
      <div className="wish-header">
        <p className="wish-title">WISH LIST</p>
        <div className="wish-actions">
          <button
            className="delete-all"
            onClick={() => {
              dispatch(clearWishlist()); // 전체 삭제
            }}
          >
            전체삭제
          </button>
        </div>
      </div>

      {/* 위시리스트 빈 상태일 때 */}
      {wishListItems.length === 0 ? (
        <p className="empty-item">위시리스트가 비어있습니다.</p>
      ) : (
        <div className="wish-items">
          {/* 위시리스트 상품 목록 */}
          {wishListItems.map((item) => {
            return (
              <div className="wish-item">
                <div className="item-image">
                  <img
                    src={`https://yihyoni.github.io/nff_product/${item.category}/${item.category}${item.id}.jpg`}
                    alt={item.title}
                  />
                </div>
                <div className="item-info">
                  <p className="item-name">{item.title}</p>
                  <p className="item-price">{item.price}</p>
                </div>
                <div className="trash-cart">
                  <button
                    className="trash-button"
                    onClick={() => {
                      dispatch(removeWishlistItem(item)); // 상품 삭제
                      // 이거 지금 인자로 item 만 보내고 있는데 category 보내야 할 거 같은데
                    }}
                  >
                    <img src="/trash.svg"></img>
                  </button>
                  <button
                    className="cart-button"
                    onClick={() => {
                      // 위시리스트에서 장바구니로 옮긴 후, 삭제
                      dispatch(
                        addCartItem(
                          item.category === "fingers"
                            ? { ...item, count: 1, size: "" }
                            : { ...item, count: 1 }
                        ) // count: 1을 따로 추가해줘야 장바구니용 데이터로 완성
                        // fingers 카테고리일때만 저  size 빈문자열을 인자로 보내기
                        // size: "" 를 써줘야 장바구니 페이지(CartContent.js)의 사이즈를 선택해주세요가 보이게 되고, 선택안함이 보이게 된다.
                      );
                      dispatch(removeWishlistItem(item)); // 위시리스트에서는 삭제
                      alert("장바구니에 담았습니다.");
                    }}
                  >
                    <img src="/cart.svg"></img>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 위시리스트 푸터 */}
      <div
        className="wish-footer"
        onClick={() => {
          if (wishListItems.length === 0) {
            alert("위시리스트를 담아주세요.");
            return;
          }
          // 전체 상품 장바구니에 담은 후, 상품 전체 삭제
          wishListItems.forEach((item) => {
            dispatch(addCartItem({ ...item, count: 1 }));
          }); // 전체 상품 주문
          // wishListItems = 리덕스로 갖고 온 위시리스트에 담긴 모든 상품들
          // wishListItems에 있는 상품들을 하나하나 꺼내서,
          // 모든 item에 대해 dispatch(addCartItem(...))을 실행
          // 상품 개수에 따라 반복문을 돌려서 하나씩 상품을 꺼낸 다음
          // → dispatch로 장바구니에 넣는 것
          dispatch(clearWishlist()); // 위시리스트 상품 전체 비우기
          alert("모든 위시리스트 상품이 장바구니에 담겼습니다.");
        }}
      >
        <button>전체 상품 주문</button>
      </div>
    </div>
  );
}

export default WishListContent;
