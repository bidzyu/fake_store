import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setAllProducts: (state, actions) => {
      return actions.payload;
    },
  },
});

export default productsSlice;
export const { setAllProducts } = productsSlice.actions;
