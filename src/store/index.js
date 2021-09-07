import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui_slice';
import productsReducer from './products_slice';
import singleProductReducer from './single_product_slice';
import filterReducer from './filter_slice';
import cartReducer from './cart_slice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    products: productsReducer,
    singleProduct: singleProductReducer,
    filter: filterReducer,
    cart: cartReducer,
  },
});

export default store;
