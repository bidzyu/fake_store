import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCheckAll } from '../../redux/reducers/selectedListSlice';
import DeleteSelected from './DeleteSelectedFromCart';

const SelectAll = () => {
  const selectedList = useSelector((state) => state.selectedList);
  const cartList = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [checked, toggleChecked] = useState(true);

  useEffect(() => {
    const newChecked = shouldBeChecked();

    if (checked !== newChecked) {
      toggleChecked(newChecked);
    }
  }, [selectedList]);

  const shouldBeChecked = () => {
    for (let bool of Object.values(selectedList)) {
      if (!bool) return false;
    }
    return true;
  };

  const shouldShowBtn = () => {
    for (let [id, bool] of Object.entries(selectedList)) {
      if (bool && cartList[id]) return true;
    }
    return false;
  };

  const handleChange = () => {
    toggleChecked(!checked);
    dispatch(toggleCheckAll(!checked));
  };

  return (
    <div className="cart-products__select">
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => handleChange()}
        />
        <span>Select All</span>
      </label>
      <DeleteSelected visible={shouldShowBtn()} allSelected={checked} />
    </div>
  );
};

export default SelectAll;
