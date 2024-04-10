import { useEffect } from 'react';
import checkAndSetScroll from '../assets/checkAndSetScroll';

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    checkAndSetScroll();
  }, []);

  return (
    <div className="container content">
      <div className="page not-found">Oops something going wrong! :(</div>
    </div>
  );
};

export default NotFound;
