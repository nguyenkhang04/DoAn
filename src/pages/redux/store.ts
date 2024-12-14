import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./features/product/productSlice";
import { cartReducer } from "./features/product/cartSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
