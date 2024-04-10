import ItemLoader from '../loader/ItemLoader';
import { useNavigate } from 'react-router-dom';
import croppingText from '../../assets/croppingText';

const SimilarProduct = (props) => {
  const { product, link } = props;
  const navigate = useNavigate();

  const clickHandler = () => {
    if (!link || !product) return;
    const id = product.id;

    navigate(`/product-info/${id}`);
  };

  const getText = () => {
    let text = '';

    if (!product || !product.title) {
      return text;
    }

    if (product.title.length > 65) {
      text = product.title.slice(0, 60) + '...';
      return text;
    }

    return product.title;
  };

  const productContent = (
    <div className="similar-product__content">
      <img className="similar-product__img" src={product?.image} alt="" />
      <p className="similar-product__title">
        {croppingText(product?.title, 60)}
      </p>
    </div>
  );

  return (
    <div className="similar-product" onClick={clickHandler}>
      {product ? productContent : <ItemLoader />}
      <div className="similar-product__window"></div>
    </div>
  );
};

export default SimilarProduct;
