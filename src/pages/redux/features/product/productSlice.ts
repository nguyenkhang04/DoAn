import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productApis } from "../../../../apis/product";
import { message } from "antd";
import { RootState } from "../../store";

export type TProduct = {
  id: string;
  img: string;
  name: string;
  price: number;
  description: string;
  brand: string;
  category: string;
};

export type TProductState = {
  products: TProduct[];
  loading: boolean;
  product: TProduct | null;
  searchQuery: string;
};

const initialState: TProductState = {
  products: [],
  loading: false,
  product: null,
  searchQuery: "",
};

export const actFetchProductById = createAsyncThunk(
  "products/actFetchProductById",
  async (productId: string, thunkApi) => {
    try {
      return await productApis.getProductById(productId);
    } catch (error) {
      return thunkApi.rejectWithValue("Không thể lấy thông tin sản phẩm.");
    }
  }
);

export const actFetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (params: Record<string, any> = {}, thunkApi) => {
    try {
      return await productApis.getAllProducts(params);
    } catch (error) {
      return thunkApi.rejectWithValue("Không thể tải danh sách sản phẩm.");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actFetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(actFetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        message.error(action.payload as string);
      })
      .addCase(actFetchAllProducts.fulfilled, (state, action) => {
        state.products = action.payload as TProduct[];
        state.loading = false;
      })
      .addCase(actFetchProductById.fulfilled, (state, action) => {
        state.product = action.payload as TProduct;
      })
      .addCase(actFetchProductById.rejected, (_, action) => {
        message.error(action.payload as string);
      });
  },
});

export const { setSearchQuery } = productSlice.actions;

export const productReducer = productSlice.reducer;

export const selectFilteredProducts = (state: RootState) => {
  const { products, searchQuery } = state.product;
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
};
