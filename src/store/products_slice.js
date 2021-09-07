import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsBegin(state) {
      state.products_loading = true;
    },
    productsError(state) {
      state.products_loading = false;
      state.products_error = true;
    },
    productsSuccess(state, action) {
      const featured_products = action.payload.filter((product) => {
        return product.featured === true;
      });

      state.products_loading = false;
      state.products_error = false;
      state.products = action.payload;
      state.featured_products = featured_products;
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
