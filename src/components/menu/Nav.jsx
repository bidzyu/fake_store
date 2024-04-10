import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNavPanel } from '../../redux/reducers/panelsSlice';
import NavLinks from './NavLinks';

const Nav = () => {
  const dispatch = useDispatch();
  const { navPanel } = useSelector((state) => state.panels);
  const ref = useRef();

  const activeClass = navPanel ? ' active' : '';

  const clickHandler = () => {
    dispatch(showNavPanel(!navPanel));
  };

  return (
    <>
      <NavLinks />
      <button
        className={'sandwitch__btn' + activeClass}
        onClick={clickHandler}
        ref={ref}
      >
        <div className="sandwitch__container">
          <div className="sandwitch__item"></div>
          <div className="sandwitch__item"></div>
          <div className="sandwitch__item"></div>
        </div>
      </button>
    </>
  );
};

export default Nav;
