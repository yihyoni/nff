import Footer from "./Footer";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import {
  removeCartItem,
  addCount,
  decreaseCount,
  clearCart,
  updateItemSize,
} from "../store/cartSlice";
import { useState } from "react";

function CartContent(props) {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // 배송비
  const deliveryFee = 0;

  // 총 금액 계산
  function parsePrice(str) {
    const noKRW = str.replace("KRW ", "");
    const noComma = noKRW.replace(",", "");
    return Number(noComma);
  }

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + parsePrice(item.price) * item.count;
  }, 0);

  const grandTotal = totalPrice + deliveryFee;

  // 사이즈 창 토글
  const [openItemId, setOpenItemId] = useState(null);

  // 사이즈 변경 변수
  const [selectedSize, setSelectedSize] = useState("");

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
                      src={`https://kku-git.github.io/nff_product/${item.category}/${item.category}${item.id}.jpg`}
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
                        onClick={() =>
                          dispatch(
                            decreaseCount(
                              item.category === "fingers"
                                ? {
                                    id: item.id,
                                    category: item.category,
                                    size: item.size,
                                  }
                                : {
                                    id: item.id,
                                    category: item.category,
                                  }
                            )
                          )
                        }
                      >
                        <img src="/minus.svg" alt="minus" />
                      </button>
                      <span className="quantity-number">{item.count}</span>
                      <button
                        className="quantity-plus"
                        onClick={() =>
                          dispatch(
                            addCount(
                              item.category === "fingers"
                                ? {
                                    id: item.id,
                                    category: item.category,
                                    size: item.size,
                                  }
                                : {
                                    id: item.id,
                                    category: item.category,
                                  }
                            )
                          )
                        }
                      >
                        <img src="/plus.svg" alt="plus" />
                      </button>
                    </div>
                    <div>
                      {item.category === "fingers" ? (
                        <button
                          className="size-button"
                          onClick={() => {
                            setOpenItemId(item.id);
                            setSelectedSize(item.size);
                          }}
                        >
                          사이즈: {item.size || "선택안됨"}
                        </button>
                      ) : (
                        <p>사이즈: One Size</p>
                      )}

                      {/* 사이즈 버튼 클릭 시 보여줄 팝업창 */}
                      {openItemId === item.id && (
                        <div className="size-modal">
                          <h2 className="option-title">옵션 변경</h2>
                          <div className="name-price">
                            <img
                              src={`https://kku-git.github.io/nff_product/${item.category}/${item.category}${item.id}.jpg`}
                              alt={item.title}
                            />
                            <p>{item.title}</p>
                          </div>

                          {item.category === "fingers" && (
                            <div className="select-wrapper">
                              <select
                                className="size-select"
                                value={selectedSize}
                                onChange={(e) =>
                                  setSelectedSize(e.target.value)
                                }
                              >
                                <option value="" disabled>
                                  사이즈를 선택해주세요
                                </option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                              </select>
                              <img
                                src="/dropdown-icon.svg"
                                alt="드롭다운 화살표"
                                className="select-icon"
                              />
                            </div>
                          )}

                          <div className="modal-buttons">
                            <button
                              onClick={() => {
                                if (selectedSize === "") {
                                  alert("사이즈를 선택해주세요.");
                                  return;
                                }

                                dispatch(
                                  updateItemSize({
                                    id: item.id,
                                    size: selectedSize,
                                  })
                                );
                                setOpenItemId(null);
                              }}
                            >
                              변경
                            </button>
                            <button
                              className="close-button"
                              onClick={() => setOpenItemId(null)}
                            >
                              닫기
                            </button>
                          </div>
                        </div>
                      )}
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
