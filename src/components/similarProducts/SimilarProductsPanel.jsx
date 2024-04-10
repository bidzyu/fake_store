import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HorisontalScroll from '../HorizontalScroll/HorisontalScroll';
import { useSelector } from 'react-redux';

const SimilarProductsPanel = (props) => {
  const category = props.category;
  const currProd = useSelector((state) => state.currProduct);
  const [similarProducts, setSimilarProducts] = useState([null, null, null]);
  const [isBasicTemplate, setIsBasicTemplate] = useState(true);
  const params = useParams();

  const fetchData = async () => {
    await fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((json) => {
        setIsBasicTemplate(false);
        const filtred = json.filter((obj) => obj.id !== +params.id);
        setSimilarProducts(filtred);
      });
  };

  useEffect(() => {
    if (isBasicTemplate && category) {
      fetchData();
    }
  }, [category]);

  useEffect(() => {
    fetchData();

    return () => {
      setSimilarProducts([null, null, null]);
    };
  }, [currProd]);

  return (
    <div className="similar-products-panel">
      <HorisontalScroll data={similarProducts} />
    </div>
  );
};

export default SimilarProductsPanel;
