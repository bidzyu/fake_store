import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import checkAndSetScroll from '../assets/checkAndSetScroll';
import Loader from '../components/loader/Loader';
import Product from '../components/product/Product';

const Category = () => {
  const params = useParams();
  const { name } = params;
  const [currCategoryList, setCurrCategoryList] = useState(null);
  const favorite = useSelector((state) => state.favorite);

  const fetchData = () => {
    fetch(`https://fakestoreapi.com/products/category/${name}`)
      .then((res) => res.json())
      .then((json) => setCurrCategoryList(json));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    checkAndSetScroll();
  }, []);

  useEffect(() => {
    fetchData();
  }, [name]);

  useEffect(() => {
    checkAndSetScroll();
  }, [currCategoryList]);

  const showProducts = () => {
    const content = currCategoryList ? (
      <div className="page category">
        {currCategoryList.map((p) => (
          <Product product={p} key={p.id} fav={!!favorite[p.id]} />
        ))}
      </div>
    ) : (
      <Loader />
    );

    return <div className="container content">{content}</div>;
  };

  return <>{showProducts()}</>;
};

export default Category;
