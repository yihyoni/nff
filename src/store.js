import { configureStore } from "@reduxjs/toolkit";
import user from "./store/userSlice";
import cart from "./store/cartSlice";
import wishlist from "./store/wishlistSlice";
import search from "./store/searchSlice";
import sidebar from "./store/sidebarSlice";

export default configureStore({
  reducer: {
    cart: cart,
    wishlist: wishlist,
    user: user,
    search: search,
    sidebar: sidebar,
  },
});
