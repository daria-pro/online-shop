export const getItemsFromLocalStorage = () => {
  const itemsFromStorage = localStorage.getItem("cartItems");

  if (itemsFromStorage) {
    const cartItems = JSON.parse(itemsFromStorage);
    return cartItems;
  }
  return null;
};
