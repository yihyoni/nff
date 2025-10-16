import Footer from "./Footer";
import Logo from "./Logo";
function SearchItems() {
  return (
    <main>
      <Logo />

      {/* 검색아이템 */}
      <div className="search-container">
        <p className="search-title">SEARCH</p>

        <div className="search-items">
          {/* 장바구니 아이템 1 */}
          <div className="search-item">
            <div className="search-image">
              <img src="/black-ring.jpg" alt="black-ring" />
            </div>
            <div className="item-info">
              <p className="search-name">black-ring</p>
              <p className="item-price">KRW 48,000</p>
            </div>
          </div>
          {/* 장바구니 아이템 2 */}
          <div className="search-item">
            <div className="search-image">
              <img src="/black-ring.jpg" alt="black-ring" />
            </div>
            <div className="item-info">
              <p className="item-name">black-ring</p>
              <p className="item-price">KRW 48,000</p>
            </div>
          </div>
          {/* 장바구니 아이템 3 */}
          <div className="search-item">
            <div className="search-image">
              <img src="/black-ring.jpg" alt="black-ring" />
            </div>
            <div className="item-info">
              <p className="item-name">black-ring</p>
              <p className="item-price">KRW 48,000</p>
            </div>
          </div>{" "}
          {/* 장바구니 아이템 4 */}
          <div className="search-item">
            <div className="search-image">
              <img src="/black-ring.jpg" alt="black-ring" />
            </div>
            <div className="item-info">
              <p className="item-name">black-ring</p>
              <p className="item-price">KRW 48,000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default SearchItems;
