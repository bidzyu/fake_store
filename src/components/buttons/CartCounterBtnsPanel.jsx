import { useDispatch, useSelector } from 'react-redux';
import { updCartProduct } from '../../redux/reducers/cartSlice';

const CartCounterBtnsPanel = (props) => {
  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { count, product } = cartProducts[props.id];

  const clickHandler = (val) => {
    dispatch(updCartProduct({ productId: props.id, count: val, product }));
  };

  return (
    <div className="counter-btn-panel">
      <button onClick={() => clickHandler(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => clickHandler(count + 1)}>+</button>
    </div>
  );
};

export default CartCounterBtnsPanel;
