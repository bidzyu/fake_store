import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllProducts } from '../redux/reducers/productsSlice';
import Product from '../components/product/Product';
import Loader from '../components/loader/Loader';
import checkAndSetScroll from '../assets/checkAndSetScroll';

const Main = () => {
  const products = useSelector((state) => state.products);
  const favorite = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  const fetchData = async () => {
    await fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => dispatch(setAllProducts(json)));
  };

  const hasIndex = (id) => {
    return !!favorite[id];
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);

    checkAndSetScroll();
  }, []);

  useEffect(() => {
    checkAndSetScroll();
  }, [products]);

  const showProducts = () => {
    if (!products.length) {
      return (
        <div className="container">
          <Loader />
        </div>
      );
    }

    return (
      <div className="container content">
        <div className="page main">
          {products.map((p) => (
            <Product product={p} key={p.id} fav={hasIndex(p.id)} />
          ))}
        </div>
      </div>
    );
  };

  return <>{showProducts()}</>;
};

export default Main;
