import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  selectProduct,
  removeSelectedProduct,
} from '../redux/reducers/currProductSlice';
import Loader from '../components/loader/Loader';
import CartBtn from '../components/buttons/CartBnt';
import CartCounterBtnsPanel from '../components/buttons/CartCounterBtnsPanel';
import { filterCartProducts } from '../redux/reducers/cartSlice';
import SimilarProductsPanel from '../components/similarProducts/SimilarProductsPanel';
import calcPriceWithoutDiscount from '../assets/getPriceWithoutDiscount';
import checkAndSetScroll from '../assets/checkAndSetScroll';
import { addFav, removeFav } from '../redux/reducers/favoriteSlice';

const ProductInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.currProduct);
  const cartProducts = useSelector((state) => state.cart);
  const fav = useSelector((state) => !!state.favorite[id]);
  const hasCurrProduct = !!cartProducts[id] && !cartProducts[id].count < 1;
  const navigate = useNavigate();

  const favClickHandler = () => {
    if (fav) {
      dispatch(removeFav(id));
    } else {
      dispatch(addFav({ id, product }));
    }
  };

  const getClass = () => {
    if (fav) {
      return ' fav';
    }

    return '';
  };

  const cartClickHandler = () => {
    navigate('/cart');
  };

  const fetchProduct = async () => {
    await fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => dispatch(selectProduct(json)));
  };

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
    checkAndSetScroll();

    return () => {
      dispatch(removeSelectedProduct());
      dispatch(filterCartProducts());
    };
  }, [id]);

  const getProduct = () => {
    if (!product) {
      return <Loader />;
    } else {
      return (
        <>
          <div className="product-info-content">
            <div className="product-wrapper">
              <div
                className={'product-favorite' + getClass()}
                onClick={favClickHandler}
              ></div>
              <div className="flex-v">
                <img src={product.image} alt="" />
              </div>
              <div className="flex-v">
                <h3>{product.title}</h3>
                <div className="category">
                  {product.category}
                  <div>
                    <div className="crossed-out">
                      $ {calcPriceWithoutDiscount(product.price)}
                    </div>
                    <span>$ {product.price.toFixed(2)}</span>
                  </div>
                </div>
                <div className="info">
                  <h4>Product Info:</h4>
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
            {hasCurrProduct ? (
              <div className="btns-panel-wrapper">
                <button onClick={cartClickHandler}>CARD</button>
                <CartCounterBtnsPanel id={id} />
              </div>
            ) : (
              <CartBtn id={id} product={product} />
            )}
          </div>
          <SimilarProductsPanel category={product && product.category} />
        </>
      );
    }
  };

  return (
    <div className="container content">
      <div className="page product-info">{getProduct()}</div>
    </div>
  );
};

export default ProductInfo;
