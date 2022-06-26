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
