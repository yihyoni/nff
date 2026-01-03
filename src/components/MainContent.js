import Footer from "./Footer";
import Logo from "./Logo";

function MainContent(props) {
  return (
    <main>
      <Logo
        setLeftSidebarToggle={props.setLeftSidebarToggle}
        setRightSidebarToggle={props.setRightSidebarToggle}
      />
      <div className="image-container">
        <img
          src="https://yihyoni.github.io/nff_product/nff_bg.svg"
          alt="배경"
          className="bg-image"
        />
      </div>
      <Footer />
    </main>
  );
}

export default MainContent;
