import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNavPanel } from '../../redux/reducers/panelsSlice';
import NavLinks from '../menu/NavLinks';

const NavPanel = () => {
  const { navPanel } = useSelector((state) => state.panels);
  const dispatch = useDispatch();
  const className = 'nav-panel';
  const navRef = useRef();

  const clickHandler = (e) => {
    const elem = e.target;
    const closestElem = elem.closest('.' + className);

    if (!navPanel) {
      e.preventDefault();
      return;
    }

    if (closestElem && elem.tagName === 'A') {
      dispatch(showNavPanel(false));
    }

    if (!closestElem || closestElem !== navRef.current) {
      if (!elem.closest('.sandwitch__container')) {
        dispatch(showNavPanel(false));
      }
      return;
    }
  };

  const addListener = () => {
    document.body.addEventListener('click', clickHandler);
  };

  const removeListener = () => {
    document.body.removeEventListener('click', clickHandler);
  };

  useEffect(() => {
    if (navPanel) {
      addListener();
    } else {
      removeListener();
    }

    return () => removeListener();
  }, [navPanel]);

  const panel = (
    <div className="nav-panel" ref={navRef}>
      <NavLinks />
    </div>
  );

  return <>{navPanel ? panel : null}</>;
};

export default NavPanel;
