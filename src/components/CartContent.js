import Footer from "./Footer";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import {
  removeCartItem,
  addCount,
  decreaseCount,
  clearCart,
} from "./../store.js";

function CartContent(props) {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // 배송비
  const deliveryFee = 0;

  // 총 금액 계산
  function parsePrice(str) {
    // "KRW 32,000" → "32,000" → "32000" → 32000 (숫자)
    const noKRW = str.replace("KRW ", ""); // "32,000"
    const noComma = noKRW.replace(",", ""); // "32000"
    return Number(noComma); // 숫자로 변환
  }

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + parsePrice(item.price) * item.count;
  }, 0);

  const grandTotal = totalPrice + deliveryFee;

  return (
    <main>
      <Logo
        setLeftSidebarToggle={props.setLeftSidebarToggle}
        setRightSidebarToggle={props.setRightSidebarToggle}
      />

      {/* 장바구니 */}
      <div className="cart-container">
        <div className="cart-header">
          <p className="cart-title">CART</p>
          <div className="cart-actions">
            <button
              className="delete-all"
              onClick={() => {
                dispatch(clearCart());
              }}
            >
              전체삭제
            </button>
          </div>
        </div>

        {/* 장바구니 아이템 */}
        {cartItems.length === 0 ? (
          <p className="empty-item">장바구니가 비어있어요.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => {
              return (
                <div className="cart-item" key={item.id}>
                  <div className="item-image">
                    <img
                      src={`https://yihyoni.github.io/nff_product/${item.category}/${item.category}${item.id}.jpg`}
                      alt={item.title}
                    />
                  </div>
                  <div className="item-info">
                    <div className="name-price">
                      <p className="item-name">{item.title}</p>
                      <p className="item-price">{item.price}</p>
                    </div>
                    <div className="item-count">
                      <button
                        className="quantity-minus"
                        onClick={() => dispatch(decreaseCount(item.id))}
                      >
                        <img src="/minus.svg" alt="minus" />
                      </button>
                      <span className="quantity-number">{item.count}</span>
                      <button
                        className="quantity-plus"
                        onClick={() => dispatch(addCount(item.id))}
                      >
                        <img src="/plus.svg" alt="plus" />
                      </button>
                    </div>
                  </div>
                  <div className="item-remove">
                    <button
                      className="remove-button"
                      onClick={() => dispatch(removeCartItem(item.id))}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="cart-summary">
          <div className="summary-row">
            <span>배송비</span>
            <span>KRW {deliveryFee.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>총 상품금액</span>
            <span>{grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* 장바구니 푸터 */}
        <div className="cart-footer">
          <button className="checkout-button">주문하기</button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
export default CartContent;
