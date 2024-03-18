/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONSTANTS} from '../../../enums';

export interface AuthState {
  loginLoading: boolean;
  verifyLoading: boolean;
  userLoading: boolean;
  logoutLoading: boolean;
  user: {
    firstName: string;
    lastName: string;
    gender: number;
    tc: string;
    dateOfBirth: string;
    phone: string;
    isPhoneVerified: boolean;
  };
}

export interface UserResponse {
  firstName: string;
  lastName: string;
  gender: number;
  tc: string;
  dateOfBirth: string;
  phone: string;
  isPhoneVerified: boolean;
}

const initialState: AuthState = {
  loginLoading: false,
  verifyLoading: false,
  userLoading: false,
  logoutLoading: false,
  user: {
    firstName: '',
    lastName: '',
    gender: 0,
    tc: '',
    dateOfBirth: '',
    phone: '',
    isPhoneVerified: false,
  },
};

export const login = createAsyncThunk('login', async (tc: string) => {
  const {data} = await http.post('/auth/login', {tc});
  await AsyncStorage.setItem(CONSTANTS.API_TOKEN, data?.token);
});

export const verify = createAsyncThunk('verify', async (code: string) => {
  const {data} = await http.post<UserResponse>('/user/verify', {code});
  return data;
});

export const getUser = createAsyncThunk('getUser', async () => {
  const {data} = await http.get<UserResponse>('/user');
  return data;
});

export const logout = createAsyncThunk('logout', async () => {
  const {data} = await http.post('/auth/logout');
  return data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.pending, (state, action) => {
      state.loginLoading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loginLoading = false;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loginLoading = false;
    });

    builder.addCase(verify.pending, (state, action) => {
      state.verifyLoading = true;
    });

    builder.addCase(verify.fulfilled, (state, action) => {
      state.user = action.payload;
      state.verifyLoading = false;
    });

    builder.addCase(verify.rejected, (state, action) => {
      state.verifyLoading = false;
    });

    builder.addCase(getUser.pending, (state, action) => {
      state.userLoading = true;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.userLoading = false;
    });

    builder.addCase(getUser.rejected, (state, action) => {
      state.userLoading = false;
    });

    builder.addCase(logout.pending, (state, action) => {
      state.logoutLoading = true;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = action.payload;
      state.logoutLoading = false;
    });

    builder.addCase(logout.rejected, (state, action) => {
      state.logoutLoading = false;
    });
  },
});

export default authSlice.reducer;
