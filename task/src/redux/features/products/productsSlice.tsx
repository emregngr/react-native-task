/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../api';

export interface IProduct {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  };
  price: number;
  image: string;
}

export interface ProductResponse {
  current: number;
  next: number;
  products: IProduct[];
  total: number;
  totalPage: number;
}

export interface ProductsState {
  productsLoading: boolean;
  productsData: {
    current: number;
    next: number;
    products: IProduct[];
    total: number;
    totalPage: number;
  };
  products: IProduct[];
}

const initialState: ProductsState = {
  productsLoading: false,
  productsData: {
    current: 0,
    next: 0,
    products: [],
    total: 0,
    totalPage: 0,
  },
  products: [],
};

export const getProducts = createAsyncThunk(
  'getProducts',
  async (page: number) => {
    const {data} = await http.get<ProductResponse>(`/products?page=${page}`);
    return data;
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProducts.pending, (state, action) => {
      state.productsLoading = true;
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.productsData = action.payload;
      state.products =
        action.payload.current === 1
          ? action.payload.products
          : [...state.products, ...action.payload.products];
      state.productsLoading = false;
    });

    builder.addCase(getProducts.rejected, (state, action) => {
      state.productsLoading = false;
    });
  },
});

export default productsSlice.reducer;
