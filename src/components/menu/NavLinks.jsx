import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { showCount } from '../../assets/calcPrice';

const NavLinks = () => {
  const cart = useSelector((state) => state.cart);
  const count = showCount(cart);

  return (
    <nav>
      <Link to="/">Catalog</Link>
      <Link to="/favorite">Favorite</Link>
      <Link to="/cart">Cart {count ? <div>{count}</div> : null}</Link>
    </nav>
  );
};

export default NavLinks;
