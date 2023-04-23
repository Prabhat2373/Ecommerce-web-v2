import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BillingInfo {
  billing_first_name: string;
  billing_last_name: string;
  billing_email: string;
  billing_phone: string;
  billing_address_line1: string;
  billing_address_line2: string;
  billing_city: string;
  billing_state: string;
  billing_zip: string;
  billing_country: string;
}

export interface UserType {
  user: any;
  avatar: Avatar;
  role: string;
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  __v: number;
  billing_info: BillingInfo;
  resetPasswordExpire: string;
  resetPasswordToken: string;
}

export interface Avatar {
  public_id: string;
  url: string;
}

const initialState = {
  state: {
    isFetching: false,
  },
  user: {
    name: '',
    isAuthenticated: false,
    LoggedIn: false,
  },
  payload: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    isLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.user.LoggedIn = action.payload;
    },
    LogoutUser: (state) => {
      state.user.LoggedIn = false;
      state.payload = [];
    },
    User: (state, action: PayloadAction<UserType>) => {
      const user = action.payload;
      console.log('userInSlice', user);
      state.payload = user;
    },
  },
});

export const { isLoggedIn, LogoutUser, User } = userSlice.actions;

export default userSlice.reducer;
