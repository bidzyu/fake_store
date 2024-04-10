const checkAndSetScroll = () => {
  const hasScroller = window.innerWidth - document.body.clientWidth !== 0;
  const hasScrollContent = document.body.clientHeight > window.innerHeight;

  if (hasScroller && hasScrollContent) {
    document.body.classList.remove('no-scroll');
    return;
  }

  if (hasScrollContent && !hasScroller) {
    document.body.classList.remove('no-scroll');
    return;
  }

  if (window.innerWidth < 960) {
    document.body.classList.remove('no-scroll');
    return;
  }

  document.body.classList.add('no-scroll');
};

export default checkAndSetScroll;
