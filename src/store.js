import { configureStore } from "@reduxjs/toolkit";
import user from "./store/userSlice";
import cart from "./store/cartSlice";
import wishlist from "./store/wishlistSlice";
import search from "./store/searchSlice";
export default configureStore({
  reducer: {
    cart: cart,
    wishlist: wishlist,
    user: user,
    search: search,
  },
});
