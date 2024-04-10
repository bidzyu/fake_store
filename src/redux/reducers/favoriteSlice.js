import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {},
  reducers: {
    addFav: (state, actions) => {
      const { id, product } = actions.payload;

      state[id] = product;
    },
    removeFav: (state, actions) => {
      const id = actions.payload;

      delete state[id];
    },
  },
});

export default favoriteSlice;
export const { addFav, removeFav } = favoriteSlice.actions;
