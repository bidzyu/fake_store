import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategories,
  setShouldShowCategories,
} from '../../redux/reducers/categoriesSlice';

const Categories = () => {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const { categoriesList: list, shouldShowCategories } = categories;

  const fetchData = async () => {
    await fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((json) => dispatch(setCategories(json)));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clickHandler = () => {
    dispatch(setShouldShowCategories(!shouldShowCategories));
  };

  const active = shouldShowCategories ? ' active' : '';

  return (
    <button className={'categories-btn' + active} onClick={clickHandler}>
      <div className="sandwitch__container">
        <div className="sandwitch__item"></div>
        <div className="sandwitch__item"></div>
        <div className="sandwitch__item"></div>
      </div>
      <span>Categories</span>
    </button>
  );
};

export default Categories;
