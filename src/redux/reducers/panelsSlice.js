import { createSlice } from '@reduxjs/toolkit';

const panelsSlice = createSlice({
  name: 'panels',
  initialState: {
    navPanel: false,
  },
  reducers: {
    showNavPanel: (state, actions) => {
      const bool = actions.payload;

      state.navPanel = bool;
    },
  },
});

export default panelsSlice;
export const { showNavPanel } = panelsSlice.actions;
