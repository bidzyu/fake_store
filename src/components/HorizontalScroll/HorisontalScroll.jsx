import { useEffect } from 'react';
import { useRef, useState } from 'react';
import SimilarProduct from '../similarProducts/SimilarProduct';
import './HorisontalScroll.css';

function HorisontalScroll(props) {
  const { data } = props;

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [canMoveLeft, setCanMoveLeft] = useState(true);
  const [canMoveRight, setCanMoveRight] = useState(true);
  const [shouldBeLink, setShouldBeLink] = useState(false);
  const [containerSize, setContainerSize] = useState(790);

  const dataSize = data.length;
  const elemsViewCount = 3;
  const gap = 20;
  const elemSize =
    (containerSize - gap * (elemsViewCount - 1)) / elemsViewCount;
  const maxVal = 0;
  const minVal = (-elemSize + -gap) * (dataSize - elemsViewCount);
  const totalPages = Math.ceil(dataSize / elemsViewCount);
  const diffToMove = 50;

  const currPage = Math.ceil(-scrollPosition / (containerSize + gap) + 1);

  const containerRef = useRef();
  const contentRef = useRef();
  const wrapperRef = useRef();

  const updContainerSize = () => {
    const newSize = wrapperRef.current.offsetWidth;

    if (newSize !== containerSize) {
      setContainerSize(newSize - 1);
    }
  };

  useEffect(() => {
    updContainerSize();
  }, [containerSize]);

  const handleResize = () => {
    updContainerSize();
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = (scrollAmount) => {
    let newScrollPosition = scrollPosition + scrollAmount;

    if (newScrollPosition > maxVal) {
      newScrollPosition = maxVal;
      setScrollPosition(newScrollPosition);
      return;
    }

    if (newScrollPosition < minVal) {
      newScrollPosition = minVal;
      setScrollPosition(newScrollPosition);
      return;
    }

    setScrollPosition(newScrollPosition);
    return;
  };

  const getShiftValue = (positive) => {
    const shiftValue = elemSize * elemsViewCount + gap * elemsViewCount;

    if (positive) {
      return shiftValue;
    }

    return -shiftValue;
  };

  const handlePointerDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX);
    setShouldBeLink(true);
  };

  const handlePointerUp = (e) => {
    if (!isMouseDown) return;

    setIsMouseDown(false);
    setCanMoveLeft(true);
    setCanMoveRight(true);
    setTimeout(() => setShouldBeLink(true));
  };

  const handlePointerMove = (e) => {
    if (!isMouseDown) return;

    const diff = startX - e.pageX;

    if (diff < -diffToMove && canMoveRight) {
      //right
      handleScroll(containerSize + gap);
      setCanMoveRight(false);
      setCanMoveLeft(true);
      setShouldBeLink(false);
      return;
    }

    if (diff > diffToMove && canMoveLeft) {
      //left
      handleScroll(-containerSize + -gap);
      setCanMoveLeft(false);
      setCanMoveRight(true);
      setShouldBeLink(false);
      return;
    }

    // if (diff < -diffToMove)
    // handleScroll(move);
  };

  const handlePointerOut = (e) => {
    if (!isMouseDown) return;

    setIsMouseDown(false);
    setCanMoveLeft(true);
    setCanMoveRight(true);
    setShouldBeLink(true);
  };

  const getWidget = () => {
    // return `${currPage} from: ${totalPages}`;
    let n = 1;
    const emptyList = new Array(totalPages).fill(0);
    const pagesList = emptyList.map(() => n++);

    return (
      <div className="hs_pages-container">
        {pagesList.map((n) => {
          const current = n === currPage;
          let classes = 'hs_pages ';

          if (current) {
            classes += 'hs_pages-current';
          }

          return <div className={classes} key={n}></div>;
        })}
      </div>
    );
  };

  return (
    <div className="hs_wrapper" ref={wrapperRef}>
      <div
        className="hs_container"
        style={{
          width: `${containerSize}px`,
          height: `${elemSize}px`,
          overflow: 'hidden',
        }}
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerOut}
      >
        <div
          className="hs_content-box"
          ref={contentRef}
          style={{
            transitionDuration: '0.3s',
            transform: `translateX(${scrollPosition}px)`,
            cursor: totalPages > 1 ? '' : 'default',
          }}
        >
          {data.map((item, index) => (
            <div
              className="hs_card"
              key={index}
              style={{
                cursor: totalPages > 1 ? '' : 'pointer',
                width: elemSize,
                height: elemSize,
              }}
            >
              <SimilarProduct product={item} link={shouldBeLink} />
            </div>
          ))}
        </div>
      </div>
      {totalPages > 1 ? (
        <>
          <div className="hs_pages-widget">{getWidget()}</div>
          {/* <div className="hs_action-btns">
            <button onClick={() => handleScroll(getShiftValue(true))}>
              Scroll Left
            </button>
            <button onClick={() => handleScroll(getShiftValue(false))}>
              Scroll Right
            </button>
          </div> */}
        </>
      ) : null}
    </div>
  );
}

export default HorisontalScroll;
