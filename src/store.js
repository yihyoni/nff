import { configureStore } from "@reduxjs/toolkit";
import user from "./store/userSlice";
import cart from "./store/cartSlice";
import wishlist from "./store/wishlistSlice";
import search from "./store/searchSlice";
import sidebar from "./store/sidebarSlice";
import products from "./store/productSlice";
import page from "./store/pageSlice";

export default configureStore({
  reducer: {
    cart,
    wishlist,
    user,
    search,
    sidebar,
    products,
    page,
  },
});
