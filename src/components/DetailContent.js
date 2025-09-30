import axios from "axios";
import Footer from "./Footer";
import Logo from "./Logo";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addCartItem } from "../store/cartSlice";
import { addWishlistItem, removeWishlistItem } from "../store/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DetailContent(props) {
  const dispatch = useDispatch();
  const { category, id } = useParams();
  const [product, setProduct] = useState(null);

  // 위시리스트 배열 갖고오기
  const wishListItems = useSelector((state) => state.wishlist);

  // 사용자 로그인 여부 확인
  const LoggedIn = useSelector((state) => state.user.LoggedIn);
  const navigate = useNavigate();

  // 사이즈 변경 변수
  const [selectedSize, setSelectedSize] = useState("");

  // 장바구니 확인 모달창
  const [showModal, setShowModal] = useState(false);

  // 방금 담은 상품 정보 저장
  const [addedItem, setAddedItem] = useState(null);

  // 상품 데이터 갖고오기
  useEffect(() => {
    axios
      .get(`https://kku-git.github.io/nff_product/${category}.json`)
      .then((res) => {
        const item = res.data.find((item) => String(item.id) === id);
        setProduct(item);
      })
      .catch(() => {
        console.log("상품 데이터 불러오기 실패");
      });
  }, [category, id]);

  if (!product) return <p>로딩중...</p>;

  const isWished = wishListItems.some(
    (item) => item.id === product.id && item.category === category
  );

  // 하트 위시리시트 토글 함수
  const toggleWishlistItem = () => {
    if (!LoggedIn) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }
    if (isWished) {
      console.log("삭제 실행");
      dispatch(removeWishlistItem({ id: product.id, category }));
      alert("위시리스트에서 삭제되었습니다.");
    } else {
      console.log("추가 실행");
      dispatch(addWishlistItem({ ...product, category }));
      alert("위시리스트에 추가되었습니다.");
    }
  };

  return (
    <main>
      <Logo
        setLeftSidebarToggle={props.setLeftSidebarToggle}
        setRightSidebarToggle={props.setRightSidebarToggle}
      />
      <div className="detail-container">
        <div className="product-summary">
          <div className="product-image">
            <img
              src={`https://kku-git.github.io/nff_product/${category}/${category}${product.id}.jpg`}
              alt={product.title}
            />
          </div>
          <div className="product-info">
            <p className="product-name">{product.title}</p>
            <p className="product-price">{product.price}</p>
            <p className="product-material">Material: pvc + resin</p>
            <p>
              해당 상품은 주문 제작 상품으로 <br />
              제작 기간 영업일 기준 3~7일 소요됩니다.
              <br />
              핸드메이드 특성상 컬러, 패턴 및 형태가 <br />
              일정하지 않은 점 참고 바랍니다.
            </p>
            {category === "fingers" && (
              <div className="select-wrapper">
                <select
                  className="size-select"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">사이즈를 선택해주세요</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>
                <img src="/dropdown-icon.svg" alt="" className="select-icon" />
              </div>
            )}
            <div className="action-buttons">
              <button
                className="wishlist-button"
                onClick={() => {
                  toggleWishlistItem();
                }}
              >
                <img
                  src={isWished ? "/heart-filled.svg" : "/heart-outline.svg"}
                  alt="wishlist"
                />
              </button>
              <button
                className="add-button"
                onClick={() => {
                  // 반지 사이즈 경고창
                  if (category === "fingers" && !selectedSize) {
                    alert("사이즈를 선택해주세요.");
                    return;
                  }

                  const itemToAdd =
                    category === "fingers"
                      ? { ...product, count: 1, category, size: selectedSize }
                      : { ...product, count: 1, category };

                  //  장바구니에 추가
                  dispatch(addCartItem(itemToAdd));
                  setAddedItem(itemToAdd);
                  setShowModal(true);

                  // 장바구니 담은거 알람
                  alert("장바구니에 담겼습니다.");
                }}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>

        {/* 장바구니에 담은거 확인용 모달창 */}
        {showModal && addedItem && (
          <div className="modal cart-modal">
            <h2 className="option-title">장바구니 담기</h2>
            <div className="name-price">
              <img
                src={`https://kku-git.github.io/nff_product/${addedItem.category}/${addedItem.category}${addedItem.id}.jpg`}
                alt={addedItem.title}
              />
              <p>{addedItem.title}</p>
              <p>{addedItem.price}</p>
              <p>수량 : {addedItem.count}</p>
              <p>사이즈 : {addedItem.size || "OneSize"}</p>
            </div>

            <div className="modal-buttons cart-buttons">
              <button
                onClick={() => {
                  navigate("/cart");
                }}
              >
                장바구니 이동
              </button>
              <button
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                쇼핑계속하기
              </button>
            </div>
          </div>
        )}

        <div className="product-detail">
          <img
            src={`https://kku-git.github.io/nff_product/${category}/${category}${id}_detail.jpg`}
            alt={`상세 이미지 ${id}`}
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default DetailContent;
