import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categoriesList: [],
    shouldShowCategories: false,
  },
  reducers: {
    setCategories: (store, actions) => {
      const cat = actions.payload;

      store.categoriesList = cat;
    },
    setShouldShowCategories: (store, actions) => {
      const bool = actions.payload;

      store.shouldShowCategories = bool;
    },
  },
});

export default categoriesSlice;
export const { setCategories, setShouldShowCategories } =
  categoriesSlice.actions;
