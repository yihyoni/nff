import { useSelector, useDispatch } from "react-redux";
import {
  removeCartItem,
  addCount,
  decreaseCount,
  clearCart,
  updateItemSize,
} from "../store/cartSlice";
import { useState } from "react";

function CartContent() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);

  // 배송비
  const deliveryFee = 0;

  // 총 금액 계산
  function parsePrice(str) {
    const noKRW = str.replace("KRW ", "");
    const noComma = noKRW.replace(",", "");
    return Number(noComma);
  }

  // 총 결제 금액
  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + parsePrice(item.price) * item.count;
  }, 0);

  // 총 결제 금액 + 배송비
  const grandTotal = totalPrice + deliveryFee;

  // 모달을 열 때마다 각 아이템에 저장된 사이즈로 select 초기화
  const [openItemId, setOpenItemId] = useState(null);

  // 사이즈 변경 변수
  // select 박스에 표시되는 값 담기
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <div className="cart-container">
      <div className="cart-header">
        <p className="cart-title">CART</p>
        <div className="cart-actions">
          <button
            className="delete-all"
            onClick={() => {
              dispatch(clearCart()); // 장바구니 비우기
            }}
          >
            전체삭제
          </button>
        </div>
      </div>

      {/* 장바구니 빈 상태일 때 */}
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
                    // category + id 기반 상품 이미지 경로

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
                        // 수량 줄이기
                        dispatch(
                          decreaseCount(
                            // size가 필요한 fingers인 경우만 size 보내기
                            item.category === "fingers"
                              ? {
                                  id: item.id,
                                  category: item.category,
                                  size: item.size, // size 보내기
                                }
                              : {
                                  id: item.id,
                                  category: item.category,
                                },
                          ),
                        )
                      }
                    >
                      <img src="/minus.svg" alt="minus" />
                    </button>

                    <span className="quantity-number">{item.count}</span>
                    <button
                      className="quantity-plus"
                      onClick={() =>
                        // 수량 늘리기
                        dispatch(
                          addCount(
                            // size가 필요한 fingers인 경우만 size 보내기
                            item.category === "fingers"
                              ? {
                                  id: item.id,
                                  category: item.category,
                                  size: item.size, // size 보내기
                                }
                              : {
                                  id: item.id,
                                  category: item.category,
                                },
                          ),
                        )
                      }
                    >
                      <img src="/plus.svg" alt="plus" />
                    </button>
                  </div>
                  <div>
                    {/* 반지 카테고리 일 때만 열리는 - 사이즈 옵션 변경 모달 팝업 */}
                    {item.category === "fingers" ? (
                      <button
                        className="size-button"
                        onClick={() => {
                          setOpenItemId(item.id);
                          // 선택한 아이템 기준으로 모달 열고 사이즈 초기화
                          setSelectedSize(item.size);
                        }}
                      >
                        사이즈: {item.size || "선택안됨"}
                      </button>
                    ) : (
                      <p>사이즈: One Size</p>
                    )}

                    {/* 사이즈 버튼 클릭 시 보여줄 모달창 */}
                    {openItemId === item.id && (
                      <div className="modal size-modal">
                        <h2 className="option-title">옵션 변경</h2>
                        <div className="name-price">
                          <img
                            src={`https://yihyoni.github.io/nff_product/${item.category}/${item.category}${item.id}.jpg`}
                            alt={item.title}
                          />
                          <p>{item.title}</p>
                        </div>

                        {item.category === "fingers" && (
                          <div className="select-wrapper">
                            <select
                              className="size-select"
                              value={selectedSize}
                              onChange={(e) => setSelectedSize(e.target.value)}
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
                                }),
                              );
                              setOpenItemId(null); // 모달창 닫기
                            }}
                          >
                            변경
                          </button>
                          <button
                            className="close-button"
                            onClick={() => setOpenItemId(null)} // 모달창 닫기
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
                    onClick={() =>
                      dispatch(
                        removeCartItem({
                          id: item.id,
                          category: item.category,
                          size: item.size,
                        }),
                      )
                    } // 상품 삭제
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
  );
}
export default CartContent;
