import { createSlice } from '@reduxjs/toolkit';

const currProductSlice = createSlice({
  name: 'currProduct',
  initialState: null,
  reducers: {
    selectProduct: (state, actions) => {
      return actions.payload;
    },
    removeSelectedProduct: (state, actions) => {
      return null;
    },
  },
});

export default currProductSlice;
export const { selectProduct, removeSelectedProduct } =
  currProductSlice.actions;
