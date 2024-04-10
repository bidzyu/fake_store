const calcPriceWithoutDiscount = (price) => {
  const newPrice = price * 0.4 + +price;

  return newPrice.toFixed(2);
};

export default calcPriceWithoutDiscount;
