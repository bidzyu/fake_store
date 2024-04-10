import { createSlice } from '@reduxjs/toolkit';

const selectedListSlice = createSlice({
  name: 'selectedList',
  initialState: {},
  reducers: {
    initSelectedList: (state, actions) => {
      const selectedIds = actions.payload;
      const selectedList = {};

      for (let id of selectedIds) {
        selectedList[id] = true;
      }

      return selectedList;
    },
    toggleCheck: (state, actions) => {
      const id = actions.payload;

      state[id] = !state[id];
    },
    toggleCheckAll: (state, actions) => {
      const bool = actions.payload;

      for (let id of Object.keys(state)) {
        state[id] = bool;
      }
    },
  },
});

export default selectedListSlice;
export const { initSelectedList, toggleCheck, toggleCheckAll } =
  selectedListSlice.actions;
