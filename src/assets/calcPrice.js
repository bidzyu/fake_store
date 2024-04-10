const calcPrice = (price, count) => {
  return (price * count).toFixed(2);
};

const showCount = (cart = {}) => {
  const cartList = Object.values(cart);

  if (!cartList.length) return null;

  const count = cartList.reduce((sum, i) => sum + i.count, 0);

  if (!count) return null;

  return count;
};

export { calcPrice, showCount };
