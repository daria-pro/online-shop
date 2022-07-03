export const getItemsFromLocalStorage = () => {
  const itemsFromStorage = localStorage.getItem("cartItems");

  if (itemsFromStorage) {
    const cartItems = JSON.parse(itemsFromStorage);
    return cartItems;
  }
  return null;
};

export const getCurrency = () => {
  const currencyFromStorage = localStorage.getItem("selectedCurrency");

  if (currencyFromStorage) {
    const currency = JSON.parse(currencyFromStorage);
    return currency;
  }
  return null;
};

export const getTotalItems = (items) => {
  if (items) {
    return items.reduce((acc, item) => acc + item.amount, 0);
  }
  return 0;
};

export const getTotalSum = (context) => {
  const currenciesList = context.cartItems.map((cartItem) => {
    return cartItem.prices;
  });
  const amountsList = context.cartItems.map((cartItem) => {
    return cartItem.amount;
  });
  const filteredPrices = currenciesList.map((item) =>
    item.filter((e) => e.currency.label === context.currency.label)
  );
  const productAmountList = filteredPrices.map(
    (price, index) => price[0].amount * amountsList[index]
  );

  const totalSum = productAmountList.reduce((acc, item) => acc + item, 0);

  return totalSum.toFixed(2);
};
