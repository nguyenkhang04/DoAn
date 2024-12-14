import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "./productSlice";


type TCartItem = {
  product: TProduct;
  quantity: number;
  
};


type TCartState = {
  cartItems: TCartItem[];
};

const initialState: TCartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TProduct>) => {
      const existingItem = state.cartItems.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1; 
      } else {
        state.cartItems.push({ product: action.payload, quantity: 1 }); 
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
