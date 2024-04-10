const croppingText = (text, maxSym) => {
  if (!text) return '';

  if (text.length <= maxSym) return text;

  return text.slice(0, maxSym - 1) + '…';
};

export default croppingText;
