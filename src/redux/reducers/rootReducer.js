import { combineSlices } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import productsSlice from './productsSlice';
import currProductSlice from './currProductSlice';
import selectedListSlice from './selectedListSlice';
import categoriesSlice from './categoriesSlice';
import panelsSlice from './panelsSlice';
import favoriteSlice from './favoriteSlice';

const rootReducer = combineSlices(
  cartSlice,
  productsSlice,
  currProductSlice,
  selectedListSlice,
  categoriesSlice,
  panelsSlice,
  favoriteSlice
);

export default rootReducer;
