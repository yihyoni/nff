import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addCartItem } from "../store/cartSlice";
import { addWishlistItem, removeWishlistItem } from "../store/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DetailContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // category와 id 값 꺼내기
  const { category, id } = useParams();

  // axios 로 갖고온 상품 데이터를 저장
  const [product, setProduct] = useState(null);

  // 위시리스트 배열 갖고오기
  const wishListItems = useSelector((state) => state.wishlist);

  // 사용자 로그인 여부 확인 - 하트버튼 로그인한 사람만 눌러야 하기 때문
  const LoggedIn = useSelector((state) => state.user.LoggedIn);

  // 사이즈 변경 변수
  const [selectedSize, setSelectedSize] = useState("");

  // 장바구니 확인 모달창
  const [showModal, setShowModal] = useState(false);

  // 방금 담은 상품 정보 저장
  const [addedItem, setAddedItem] = useState(null);

  // 상품 데이터 갖고오기
  // 해당 category의 상품 목록 json을 axios로 요청
  useEffect(() => {
    axios
      .get(`https://yihyoni.github.io/nff_product/${category}.json`)
      .then((res) => {
        const item = res.data.find((item) => String(item.id) === id);
        // URL 파라미터 id와 일치하는 상품 선택

        setProduct(item);
      })
      .catch(() => {
        console.log("상품 데이터 불러오기 실패");
      });
  }, [category, id]);

  // 상품 데이터가 존재하지 않으면 로딩
  if (!product) return <p>로딩중...</p>;

  // 현재 상품의 위시리스트 포함 여부
  const isWished = wishListItems.some(
    (item) => item.id === product.id && item.category === category
  );

  // 하트 위시리시트 토글 함수 (위시리스트 추가/제거 토글)
  const toggleWishlistItem = () => {
    // 로그인 상태 여부 확인
    if (!LoggedIn) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return; // 로그인 안 했으면 여기서 종료한 후, 로그인 페이지로 이동
    }
    if (isWished) {
      console.log("위시리스트에서 삭제"); // 이미 위시리스트에 있으면 제거
      dispatch(removeWishlistItem({ id: product.id, category }));
      // 위시리스트 식별 및 이미지 경로 처리를 위해 category 포함

      alert("위시리스트에서 삭제되었습니다.");
    } else {
      console.log("위시리스트에서 추가");
      dispatch(addWishlistItem({ ...product, category })); // 위시리스트에 없으면 추가
      alert("위시리스트에 추가되었습니다.");
    }
  };

  return (
    <div className="detail-container">
      <div className="product-summary">
        <div className="product-image">
          <img
            src={`https://yihyoni.github.io/nff_product/${category}/${category}${product.id}.jpg`}
            alt={product.title}
          />
          {/* URL 파라미터로 받은 카테고리와 id 값을 이용해서 변수로 경로 넣어주기 */}
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

          {/* fingers 카테고리 일 때만, select 태그 보여주기 */}
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
              <img
                src="/dropdown-icon.svg"
                alt="drop-down" // 이거 이름 수정하고싶음
                className="select-icon"
              />
            </div>
          )}

          <div className="action-buttons">
            {/* 하트 누를 시, 위시리스트 추가 버튼 */}
            <button
              className="wishlist-button"
              onClick={() => {
                toggleWishlistItem(); //위시리스트 추가
              }}
            >
              <img
                src={isWished ? "/heart-filled.svg" : "/heart-outline.svg"}
                alt="wishlist"
              />
              {/* 현재 보고 있는 상품이 wishlist에 있는 여부에 따른 하트 토글 */}
            </button>

            {/* 장바구니 추가 버튼 */}
            <button
              className="add-button"
              onClick={() => {
                // 반지 사이즈 미선택 시 경고창
                if (category === "fingers" && !selectedSize) {
                  alert("사이즈를 선택해주세요.");
                  return;
                }

                const itemToAdd =
                  category === "fingers"
                    ? { ...product, count: 1, category, size: selectedSize }
                    : { ...product, count: 1, category };
                // 장바구니 처리에 필요한 category 포함

                //  장바구니에 추가 (Redux에 저장)
                dispatch(addCartItem(itemToAdd)); // 장바구니에 넣기
                setAddedItem(itemToAdd); // 방금 담은 아이템 기록
                setShowModal(true); // 모달 열기

                // 장바구니 담기 성공 알람
                alert("장바구니에 담겼습니다.");
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      {/* 장바구니에 담은거 확인용 모달창 */}
      {/* addedItem = 모달에 표시할 방금 담은 상품 정보가 제대로 들어왔는지 확인 */}
      {showModal && addedItem && (
        <div className="modal cart-modal">
          <h2 className="option-title">장바구니 담기</h2>
          <div className="name-price">
            <img
              src={`https://yihyoni.github.io/nff_product/${addedItem.category}/${addedItem.category}${addedItem.id}.jpg`}
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

      {/* 상품 상세 이미지 */}
      <div className="product-detail">
        <img
          src={`https://yihyoni.github.io/nff_product/${category}/${category}${id}_detail.jpg`}
          alt={`상세 이미지 ${id}`}
        />
      </div>
    </div>
  );
}

export default DetailContent;
