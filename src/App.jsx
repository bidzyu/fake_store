import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/menu/Menu';
import Main from './pages/Main';
import Cart from './pages/Cart';
import Favorite from './pages/Favorite';
import NotFound from './pages/NotFound';
import ProductInfo from './pages/ProductInfo';
import Footer from './components/footer/Footer';
import { useEffect } from 'react';
import CategoriesPanel from './components/panels/CategoriesPanel';
import Category from './pages/Category';
import NavPanel from './components/panels/NavPanel';

const App = () => {
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <Router>
      <Menu />
      <CategoriesPanel />
      <NavPanel />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/favorite" element={<Favorite />}></Route>
        <Route path="/product-info/:id" element={<ProductInfo />}></Route>
        <Route path="/category/:name" element={<Category />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
