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
  // 빈박스인 상태로 생성하고 담기위해 null 로 시작.
  // [] 빈배열이 아니라 null 로 시작해도 되나?
  const [product, setProduct] = useState(null);

  // 위시리스트 배열 갖고오기
  // 현재 해당 상품이 위시리스트에 담겨있는지 여부 확인 위해 갖고옴.
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
        // id가 URL에서 받아온 id랑 일치하는 상품 하나만 찾기
        // item.id = 갖고온 데이터 id.속성 = 숫자
        // id는 URL 파라미터에서 받은 값 = 문자열
        // 해당 카테고리 전체 상품 목록 중에서 id 값이 URL(useParams)에서 가져온 값(id)과 일치하는 상품 하나만 찾아서 해당상품 상세페이지 보여주기

        setProduct(item);
      })
      .catch(() => {
        console.log("상품 데이터 불러오기 실패");
      });
  }, [category, id]);

  // 상품 데이터가 존재하지 않으면 로딩
  if (!product) return <p>로딩중...</p>;

  // product(상품데이터)가 존재할 때만 실행되어야 해서 로딩중 아래에 작성
  // 이 아래는 product가 확실히 있는 구간
  // 현재 상세페이지로 보고 있는 상품이 wishlist 에 있는지 확인
  // 카테고리도 동일해야하고 id 도 동일해야 true 반환
  // wishlist 에 있는 지 확인해서 하트 토글 조건으로 사용
  const isWished = wishListItems.some(
    (item) => item.id === product.id && item.category === category,
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
      // 상품 JSON에는 category 정보가 없어서
      // 위시리스트에서 상품을 구분하고 처리하기 위해 category 값을 함께 전달
      // category가 있어야 어느 폴더의 어떤 파일을 불러올지 경로를 정확히 만들 수 있음.
      // 예: hair/hair2.jpg, fingers/fingers3.jpg 이런 식
      // 나중에 위시리스트에서 장바구니로 보낼 때도 활용됨
      // 결론: 위시리스트 항목에서도 이미지 경로, 식별, 이동 로직 등에 필요하기 때문에
      // category 값을 함께 저장한다

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
                value={selectedSize} // 현재 선택된 값을 반영
                onChange={(e) => setSelectedSize(e.target.value)} // 사용자가 고르면 state에 저장
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
                // 상품 JSON에는 category 정보가 없기 때문에
                // 장바구니에 추가할 때 category를 함께 보내서
                // CartContent에서 이미지 경로나 로직 분기에 활용할 수 있게 만든다
                // 사용자가 지금 보고 있는 product에서 필요한 정보를 꺼내서, 장바구니에 넣을 객체

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
          src={`https://yihyoni.github.io/nff_product/${category}/${category}${id}_detail.jpg`} // 폴더명+아이디_detail.jpg
          // hair0_detail.jpg
          alt={`상세 이미지 ${id}`}
        />
      </div>
    </div>
  );
}

export default DetailContent;
