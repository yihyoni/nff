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
                        ) // 장바구니 처리용 기본 값(count, size)
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
          }); // 위시리스트 전체를 장바구니로 이동

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
