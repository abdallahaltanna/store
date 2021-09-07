import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false,
  grid_view: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showSidebar(state) {
      state.isSidebarOpen = true;
    },
    closeSidebar(state) {
      state.isSidebarOpen = false;
    },
    gridView(state) {
      state.grid_view = true;
    },
    listView(state) {
      state.grid_view = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
