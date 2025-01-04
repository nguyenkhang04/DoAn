import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "./productSlice";  
import { RootState } from "../../store";

type TCartItem = {
  product: TProduct; 
  quantity: number;
};

type TCartState = {
  cartItems: TCartItem[];
};

const initialState: TCartState = {
  cartItems: (() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error("Error parsing cart items from localStorage", error);
        return [];
      }
    }
    return [];
  })(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    setCartItems: (state, action: PayloadAction<TCartItem[]>) => {
      state.cartItems = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    addToCart: (state, action: PayloadAction<TProduct>) => {
      const existingProduct = state.cartItems.find(
        (item) => item.product.id === action.payload.id 
      );
    
      console.log(existingProduct);
      console.log(action);
      

      if (existingProduct) {
   
        existingProduct.quantity += 1;
      } else {

        state.cartItems.push({
          product: action.payload,
          quantity: 1,
        });
      }

      const cartItemsToSave = state.cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
      }));
    
      console.log('Giỏ hàng sau khi thêm:', cartItemsToSave);
      localStorage.setItem("cartItems", JSON.stringify(cartItemsToSave));
    },
    

    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product.id === productId
      );

      if (existingItem) {
        state.cartItems = state.cartItems.filter(
          (item) => item.product.id !== productId
        );
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product.id === productId
      );

      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
      }

      state.cartItems = state.cartItems.filter((item) => item.quantity > 0);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});


export const { setCartItems, addToCart, removeFromCart, clearCart, updateCartItemQuantity } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
