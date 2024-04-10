import Nav from './Nav';
import Search from './Search';
import Categories from './Categories';
import Logo from './Logo';

const Menu = () => {
  return (
    <div className="container container__menu fixed">
      <div className="menu">
        <Logo />
        <Categories />
        <Search />
        <Nav />
      </div>
    </div>
  );
};

export default Menu;
