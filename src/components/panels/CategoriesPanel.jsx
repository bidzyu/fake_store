import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShouldShowCategories } from '../../redux/reducers/categoriesSlice';
import { useNavigate } from 'react-router-dom';

const CategoriesPanel = () => {
  const { categoriesList: list, shouldShowCategories } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoriesRef = useRef();

  const className = 'categories-panel';

  const clickHandler = (e) => {
    const elem = e.target;
    const closestElem = elem.closest('.' + className);

    if (!shouldShowCategories) {
      e.preventDefault();
      return;
    }

    if (!closestElem || closestElem !== categoriesRef.current) {
      if (!elem.closest('.categories-btn')) {
        dispatch(setShouldShowCategories(false));
      }

      return;
    }
  };

  const addListener = () => {
    document.body.addEventListener('click', clickHandler);
  };

  const removeListener = () => {
    document.body.removeEventListener('click', clickHandler);
  };

  useEffect(() => {
    if (shouldShowCategories) {
      addListener();
    } else {
      removeListener();
    }

    return () => removeListener();
  }, [shouldShowCategories]);

  const categoryClickHandler = (categoryName) => {
    dispatch(setShouldShowCategories(false));
    navigate(`/category/${categoryName}`);
  };

  const content = (
    <div className={className} ref={categoriesRef}>
      <div className="categories-panel__list">
        {list.map((l) => (
          <div
            className="categories-panel__item"
            key={l}
            onClick={() => categoryClickHandler(l)}
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );

  return <>{shouldShowCategories ? content : null}</>;
};

export default CategoriesPanel;
