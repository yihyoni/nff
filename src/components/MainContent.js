import Footer from "./Footer";
import Logo from "./Logo";

function MainContent() {
  return (
    <main>
      <Logo />
      <div className="image-container">
        <img
          src="https://kku-git.github.io/nff_product/nff_bg.svg"
          alt="배경"
          className="bg-image"
        />
      </div>
      <Footer />
    </main>
  );
}

export default MainContent;
