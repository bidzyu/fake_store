import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import checkAndSetScroll from '../assets/checkAndSetScroll';
import FavProduct from '../components/product/FavProduct';

const Favorite = () => {
  const fav = useSelector((state) => state.favorite);

  useEffect(() => {
    window.scrollTo(0, 0);
    checkAndSetScroll();
  }, []);

  const showFavorite = () => {
    const isEmpty = Object.keys(fav).length === 0;

    if (isEmpty) {
      return (
        <div className="favorite-empty">
          <h3>Favorite is empty</h3>
          <p>
            Add products using <span>❤️</span>
          </p>
        </div>
      );
    }

    return (
      <div className="favorite-products">
        {Object.values(fav).map((prod) => (
          <FavProduct product={prod} key={prod.id} />
        ))}
      </div>
    );
  };

  return (
    <div className="container content">
      <div className="page favorite">{showFavorite()}</div>
    </div>
  );
};

export default Favorite;
