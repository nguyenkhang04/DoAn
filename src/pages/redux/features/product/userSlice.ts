import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  deliveryMethod: string;
  cartItems: Array<{ productId: string; quantity: number }>;
}

interface UserState {
  loggedInUser: {
    id: string;
    name: string;
    email: string;
    phone: string;
  } | null;
  userscarts: UserInfo[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  loggedInUser: null,
  userscarts: [],
  loading: false,
  error: null,
};

export const submitUserInfo = createAsyncThunk(
  "user/submitUserInfo",
  async (userInfo: UserInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:9999/orders",
        userInfo
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Có lỗi xảy ra khi gửi thông tin"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userscarts.push(action.payload);
    },
    login: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        email: string;
        phone: string;
      }>
    ) => {
      state.loggedInUser = action.payload;
    },
    logout: (state) => {
      state.loggedInUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userscarts.push(action.payload);
      })
      .addCase(submitUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const userReducer = userSlice.reducer;
export const { addUserInfo, login, logout } = userSlice.actions;
