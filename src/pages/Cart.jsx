import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartProduct from '../components/product/CartProduct';
import SelectAll from '../components/buttons/SelectAll';
import { filterCartProducts } from '../redux/reducers/cartSlice';
import { initSelectedList } from '../redux/reducers/selectedListSlice';
import calcPriceWithoutDiscount from '../assets/getPriceWithoutDiscount';
import { showCount } from '../assets/calcPrice';
import checkAndSetScroll from '../assets/checkAndSetScroll';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const selectedList = useSelector((state) => state.selectedList);
  const cartProducts = Object.entries(cart);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    checkAndSetScroll();

    dispatch(initSelectedList(Object.keys(cart)));

    return () => {
      dispatch(filterCartProducts());
    };
  }, []);

  const showCart = () => {
    if (cartProducts.length) {
      return (
        <div className="cart-products__wrapper">
          <div className="cart-products__container">
            <SelectAll />
            <div className="cart-products__list">
              {cartProducts.map((p) => {
                const [id, { count, product }] = p;
                const checked = selectedList[id];

                return (
                  <CartProduct
                    key={id}
                    id={id}
                    count={count}
                    product={product}
                    checked={checked ? true : false}
                  />
                );
              })}
            </div>
          </div>
          <div className="cart-products__price-bar">{showPriceBar()}</div>
        </div>
      );
    }

    return (
      <div className="cart-empty">
        Your cart is empty 🛍️.
        <h4>o(〒﹏〒)o</h4>
      </div>
    );
  };

  const showPriceBar = () => {
    const count = showCount(cart);

    if (!count) return null;

    const total = cartProducts.reduce((res, p) => {
      const [id, { count, product }] = p;

      return res + count * product.price;
    }, 0);

    const withoutDiscount = calcPriceWithoutDiscount(total);
    const discount = (calcPriceWithoutDiscount(total) - total).toFixed(2);

    return (
      <div className="cart__price-bar">
        <div className="cart__price-bar-item">
          <div>Products ({count}): </div>
          <div className="color-red bold">$ {withoutDiscount}</div>
        </div>
        <div className="cart__price-bar-item">
          <div>Discount: </div>
          <div className="bold">$ -{discount}</div>
        </div>
        <br />
        <div className="cart__price-bar-item">
          <div className="bold">Price to pay: </div>
          <span className="bold color-green">$ {total.toFixed(2)}</span>
        </div>

        <button className="pay-btn">Pay</button>
      </div>
    );
  };

  return (
    <div className="container content">
      <div className="page cart">{showCart()}</div>
    </div>
  );
};

export default Cart;
