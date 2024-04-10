import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import checkFavClass from '../../assets/checkFavClass';
import calcPriceWithoutDiscount from '../../assets/getPriceWithoutDiscount';
import { addFav, removeFav } from '../../redux/reducers/favoriteSlice';

const Product = (props) => {
  const { product, fav } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickHandler = (id) => {
    navigate(`/product-info/${id}`);
  };

  const price = product.price.toFixed(2);

  const favClickHandler = (e) => {
    e.stopPropagation();
    if (fav) {
      dispatch(removeFav(product.id));
    } else {
      dispatch(addFav({ id: product.id, product }));
    }
  };

  const getClass = () => {
    if (fav) {
      return ' fav';
    }

    return '';
  };

  return (
    <div className="product" onClick={() => clickHandler(product.id)}>
      <div
        className={'product-favorite' + getClass()}
        onClick={favClickHandler}
      ></div>
      <div className="product-img__wrapper">
        <img src={product.image} alt="" className="product-img" />
      </div>
      <div className="price">
        <div className="crossed-out">
          $ {calcPriceWithoutDiscount(product.price)}
        </div>
        <span className="color-red">$ {price}</span>{' '}
      </div>
      <div>{product.title}</div>
      <div className="product__window"></div>
    </div>
  );
};

export default Product;
