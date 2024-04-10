import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { calcPrice } from '../../assets/calcPrice';
import CartCounterBtnsPanel from '../buttons/CartCounterBtnsPanel';
import CartBtn from '../buttons/CartBnt';
import { toggleCheck } from '../../redux/reducers/selectedListSlice';
import calcPriceWithoutDiscount from '../../assets/getPriceWithoutDiscount';

const CartProduct = (props) => {
  const { id, count, product, checked } = props;
  const { title, description, image, price, category } = product;
  const dispatch = useDispatch();

  const cartProducts = useSelector((state) => state.cart);
  const hasCurrProduct = !!cartProducts[id] && !cartProducts[id].count < 1;

  const total = calcPrice(price, count);

  return (
    <div className="cart-product">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => dispatch(toggleCheck(id))}
      />
      <Link className="cart-product__link" to={`/product-info/${id}`}>
        <img src={image} alt="" />
        <div className="cart-product__title">
          {title} <br /> <span>{category}</span>
        </div>

        <div className="cart-product__price">
          <div className="crossed-out">$ {calcPriceWithoutDiscount(total)}</div>
          <div>$ {total}</div>
        </div>
      </Link>
      <div className="cart-product__counter">
        {hasCurrProduct ? (
          <CartCounterBtnsPanel id={id} />
        ) : (
          <CartBtn id={id} product={product} />
        )}
      </div>
    </div>
  );
};

export default CartProduct;
