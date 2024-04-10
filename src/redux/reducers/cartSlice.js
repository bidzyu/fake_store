import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    updCartProduct: (state, actions) => {
      const { productId, count, product } = actions.payload;

      state[productId] = { count, product };
    },
    filterCartProducts: (state) => {
      for (let [id, { count }] of Object.entries(state)) {
        if (count < 1) {
          delete state[id];
        }
      }
    },
    clearCart: () => {
      return {};
    },
    deleteProductsFromCart: (state, actions) => {
      for (let id of Object.keys(state)) {
        if (actions.payload.includes(id)) {
          delete state[id];
        }
      }
    },
  },
});

export default cartSlice;
export const {
  updCartProduct,
  filterCartProducts,
  clearCart,
  deleteProductsFromCart,
} = cartSlice.actions;
