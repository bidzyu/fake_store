import { useDispatch, useSelector } from 'react-redux';
import { updCartProduct } from '../../redux/reducers/cartSlice';
import { removeFav } from '../../redux/reducers/favoriteSlice';
import { useNavigate } from 'react-router-dom';
import croppingText from '../../assets/croppingText';

const FavProduct = (props) => {
  const cart = useSelector((state) => state.cart);
  const { product } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasProduct = cart[product.id] && cart[product.id].count > 0;

  const addToCartHandler = () => {
    if (!hasProduct) {
      dispatch(updCartProduct({ productId: product.id, count: 1, product }));
    } else {
      navigate('/cart');
    }
  };

  const removeFromFavHandler = () => {
    dispatch(removeFav(product.id));
  };

  const linkClickHandler = (e) => {
    e.preventDefault();

    navigate('/product-info/' + product.id);
  };

  return (
    <div className="favorite-product">
      <div className="favorite-product__btns-panel">
        <button
          onClick={addToCartHandler}
          style={{
            color: hasProduct ? 'green' : '',
          }}
        >
          {hasProduct ? 'OPEN 🛒' : 'ADD 🛒'}
        </button>
        <button onClick={removeFromFavHandler}>✖</button>
      </div>
      <div className="favorite-product__img-wrapper">
        <img src={product.image} alt="" className="favorite-product__img" />
        <div className="favorite-product__window"></div>
      </div>
      <a href="#" onClick={linkClickHandler}>
        {croppingText(product?.title, 50)}
      </a>
    </div>
  );
};

export default FavProduct;
