import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productApis } from "../../../../apis/productApis";
import { message } from "antd";
import { RootState } from "../../store";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}
interface TSubImgs  {
  color: "white" | "black";
  url: string;
}

export type TProduct = {
  id: string;
  img: string;
  name: string;
  price: number;
  description: string;
  brandId: string;
  categoryId: string;
  subImgs: TSubImgs[];
  selectedSubImg?: string;
};

export type TProductState = {
  products: TProduct[];
  loading: boolean;
  product: TProduct | null;
  searchQuery: string;
  categories: { id: string; name: string }[];
  brands: { id: string; name: string }[];
  
};

const initialState: TProductState = {
  products: [],
  loading: false,
  product: null,
  searchQuery: "",
  categories: [],
  brands: [],
};

export const actFetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (params: Record<string, any> = {}, thunkApi) => {
    try {
      const response = await productApis.getAllProducts(params);
      return response;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>; 
      const errorMessage = err.response?.data?.message || "Không thể tải danh sách sản phẩm.";
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const actFetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId: string, thunkApi) => {
    try {
      const response = await productApis.getProductById(productId);
      return response;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;  
      const errorMessage = err.response?.data?.message || "Không thể tải sản phẩm.";
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);


export const actFetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, thunkApi) => {
    try {
      const response = await productApis.getAllCategories();
      return response;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;  
      const errorMessage = err.response?.data?.message || "Không thể tải danh mục.";
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);


export const actFetchBrands = createAsyncThunk(
  "products/fetchBrands",
  async (_, thunkApi) => {
    try {
      const response = await productApis.getAllBrands();
      return response;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;  
      const errorMessage = err.response?.data?.message || "Không thể tải danh sách thương hiệu.";
      return thunkApi.rejectWithValue(errorMessage);
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
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(actFetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(actFetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(actFetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(actFetchProductById.rejected, (state, action) => {
        state.loading = false;
        message.error(action.payload as string);
      })
      .addCase(actFetchProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
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
