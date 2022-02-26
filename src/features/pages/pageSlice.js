import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'dashBoard',
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { setPage } = pageSlice.actions;

export const selectPage = (state) => state.page.value;

export default pageSlice.reducer;