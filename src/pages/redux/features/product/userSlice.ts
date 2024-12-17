import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  deliveryMethod: string;
  cartItems: Array<{ productId: string; quantity: number }>;
}

interface UserState {
  userscarts: UserInfo[];
}

const initialState: UserState = {
  userscarts: [],
};

export const submitUserInfo = (userInfo: UserInfo) => async (dispatch: any) => {
  try {
    const response = await axios.post('http://localhost:9999/userscarts', userInfo);
    console.log('Dữ liệu đã được gửi thành công:', response.data);
    dispatch(addUserInfo(response.data));
  } catch (error) {
    console.error('Lỗi khi gửi thông tin:', error);
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userscarts.push(action.payload);
    },
  },
});

export const { addUserInfo } = userSlice.actions;
export const userReducer = userSlice.reducer;
