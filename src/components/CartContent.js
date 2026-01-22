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
  // Redux에 저장돼있는 장바구니 전체 목록 배열 가져오기
  // 전역 상태에 저장된 모든 장바구니 아이템을 꺼내서 .map()으로 담긴 목록 보여주기
  const cartItems = useSelector((state) => state.cart);

  // 배송비
  const deliveryFee = 0;

  // 총 금액 계산 (계산을 위해 문자열 -> 숫자 속성으로 바꾸기)
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

  // 사이즈 창 토글 - 아이템마다 구분해서 특정 아이템의 모달만 열리도록 구분
  // 모든 아이템이 같은 상태를 공유하는 문제 해결
  // 열고 싶은 아이템의 id 저장 (클릭한 아이템의 id )
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
          {/* 장바구니 상품 목록 */}
          {cartItems.map((item) => {
            return (
              <div className="cart-item" key={item.id}>
                <div className="item-image">
                  <img
                    src={`https://yihyoni.github.io/nff_product/${item.category}/${item.category}${item.id}.jpg`}
                    // 상품 이미지 URL 생성 (ex: fingers/fingers5.jpg)
                    // 각 상품의 id와 category 값을 이용해 해당 상품 이미지 URL을 생성
                    // 상품의 id를 이용해 상세페이지 경로(`/detail/fingers/5`)와 이미지 경로(`fingers5.jpg`)를 동적으로 구성
                    // Link에서 상품 id를 기준으로 경로를 구성하고 있기 때문에
                    // 이미지 파일명도 id 기준으로 맞추면 구조를 일관되게 관리할 수 있음

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
                    {/* 상품 수량 */}
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
                          // 장바구니에 들어있는 아이템 중에서 클릭한 아이템의 id 저장
                          setSelectedSize(item.size);
                          // 해당 상품의 사이즈 넣어서 select 값 초기화
                          // 모달을 열 때마다 각 아이템에 저장된 사이즈로 덮어씌워 초기화
                        }}
                      >
                        사이즈: {item.size || "선택안됨"}
                      </button>
                    ) : (
                      <p>사이즈: One Size</p>
                    )}

                    {/* 사이즈 버튼 클릭 시 보여줄 모달창 */}
                    {/* 조건부 렌더링으로 띄우고 싶은 해당 아이템만 모달 띄우기 */}
                    {/* openItemId는 클릭한 아이템의 id */}
                    {/* 장바구니에 있는 아이템들의 id 중에서 클릭한 아이템의 id 와 동일하면 모달창 오픈  */}
                    {/* 장바구니 안에 있던 값들 중에서 내가 클릭한 아이템 하나를 콕 찍어야 하기 때문에  */}
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
                    onClick={() => dispatch(removeCartItem(item.id))} // 상품 삭제
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
