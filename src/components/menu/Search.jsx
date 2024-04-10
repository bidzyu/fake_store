import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllProducts } from '../../redux/reducers/productsSlice';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const products = useSelector((state) => state.products);
  const [isFocus, setIsFocus] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [prodTit, setProdTit] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async () => {
    await fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => dispatch(setAllProducts(json)));
  };

  useEffect(() => {
    if (products.length < 1) {
      fetchData();
    }
  }, []);

  const updProdTit = () => {
    const newProdTit = products.reduce((res, p) => {
      res[p.title] = p.id;

      return res;
    }, {});

    setProdTit(newProdTit);
  };

  const noMatches = (
    <div className="search-no-matches">
      <div>🔍</div> No matches 😔
    </div>
  );

  const clickHandler = (e, v) => {
    e.preventDefault();

    const id = prodTit[v];

    navigate('/product-info/' + id);
  };

  const searchMatches = () => {
    let titles = Object.keys(prodTit);

    titles = titles.reduce((res, t) => {
      const title = t.toLowerCase();
      const value = searchVal.toLowerCase();

      const index = title.search(value);
      const length = value.length;

      if (index === -1 || !value) return res;

      const content = {};

      content.start = t.slice(0, index);
      content.mid = t.slice(index, index + length);
      content.end = t.slice(index + length);
      content.full = t;

      res.push(content);

      return res;
    }, []);

    if (!titles.length) return noMatches;

    if (titles.length > 5) titles.length = 5;

    titles = titles.map((t) => (
      <a
        href="#"
        className="search-variant"
        key={t.full}
        onClick={(e) => clickHandler(e, t.full)}
      >
        <span className="search-icon">🔎</span>

        {t.start}
        <span className="search-value">{t.mid}</span>
        {t.end}
      </a>
    ));

    return titles;
  };

  useEffect(() => {
    updProdTit();
  }, [products]);

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

  const handleClick = (e) => {
    setSearchVal('');
  };

  const content = <div className="search-variants">{searchMatches()}</div>;

  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="seacrh-input"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setTimeout(() => setIsFocus(false), 100)}
        onChange={handleChange}
        value={searchVal}
      />
      <button
        onClick={handleClick}
        style={{ display: searchVal ? '' : 'none' }}
      >
        ✖
      </button>
      <button
        disabled
        style={{
          display: searchVal ? 'none' : '',
          fontSize: '2rem',
          marginTop: '-0.25rem',
          cursor: 'default',
        }}
      >
        ⌕
      </button>
      {isFocus && searchVal ? content : null}
    </div>
  );
};

export default Search;
