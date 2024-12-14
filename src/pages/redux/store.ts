import { configureStore, GetState } from "@reduxjs/toolkit";
import { productReducer } from "./features/product/productSlice";

export const store = configureStore ({
    reducer: {
        product: productReducer,
    },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = typeof store.dispatch;