import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./features/product/productSlice";
import { cartReducer } from "./features/product/cartSlice";
import { userReducer } from "./features/product/userSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
