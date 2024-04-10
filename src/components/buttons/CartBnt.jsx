import { useDispatch } from 'react-redux';
import { updCartProduct } from '../../redux/reducers/cartSlice';

const CartBtn = (props) => {
  const dispatch = useDispatch();

  const clickHandler = (e) => {
    dispatch(
      updCartProduct({ productId: props.id, count: 1, product: props.product })
    );
  };

  return (
    <div className="cart-btn-wrapper">
      <button className="cart-btn" onClick={clickHandler}>
        Add to Cart
      </button>
    </div>
  );
};

export default CartBtn;
