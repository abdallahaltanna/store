import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {
    singleProductBegin(state) {
      state.single_product_loading = true;
      state.single_product_error = false;
    },
    singleProductError(state) {
      state.single_product_loading = false;
      state.single_product_error = true;
    },
    singleProductSuccess(state, action) {
      state.single_product_loading = false;
      state.single_product_error = false;
      state.single_product = action.payload;
    },
  },
});

export const { singleProductBegin, singleProductError, singleProductSuccess } =
  singleProductSlice.actions;

export default singleProductSlice.reducer;
