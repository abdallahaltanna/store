import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filtered_products: [],
  all_products: [],
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    loadProducts(state, action) {
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);

      state.all_products = [...action.payload];
      state.filtered_products = [...action.payload];
      state.filters = {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
      };
    },
    updateSort(state, action) {
      state.sort = action.payload;
    },
    sortProducts(state) {
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];
      if (sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => {
          if (a.price < b.price) {
            return -1;
          }
          if (a.price > b.price) {
            return 1;
          }
          return 0;
        });
      }
      if (sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      state.filtered_products = tempProducts;
    },
    updateFilters(state, action) {
      let { name, value } = action.payload;
      state.filters = { ...state.filters, [name]: value };
    },
    filterProducts(state) {
      const { all_products } = state;
      const { text, company, category, color, price, shipping } = state.filters;

      let tempProducts = [...all_products];

      // filters
      // text
      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text);
        });
      }
      // category
      if (category !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        );
      }

      // company
      if (company !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        );
      }

      // colors
      if (color !== 'all') {
        tempProducts = tempProducts.filter((product) =>
          product.colors.find((c) => c === color)
        );
      }

      // price
      tempProducts = tempProducts.filter((product) => product.price <= price);

      // shipping
      if (shipping) {
        tempProducts = tempProducts.filter(
          (product) => product.shipping === true
        );
      }

      state.filtered_products = tempProducts;
    },

    clearFilters(state) {
      state.filters = {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      };
    },
  },
});

export const {
  loadProducts,
  updateSort,
  sortProducts,
  updateFilters,
  filterProducts,
  clearFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
