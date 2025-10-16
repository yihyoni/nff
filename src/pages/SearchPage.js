import { useSelector } from "react-redux";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import SearchItems from "../components/SearchItems";
import Header from "../components/Header";
import SearchOverlay from "../components/SearchOverlay";

function SearchPage(props) {
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);

  return (
    <div className="wrapper">
      {isSearchOpen && <SearchOverlay />}

      <Header />

      <div className="container">
        <LeftSidebar handleCategoryChange={props.handleCategoryChange} />
        <SearchItems />

        <RightSidebar />
      </div>
    </div>
  );
}
export default SearchPage;
