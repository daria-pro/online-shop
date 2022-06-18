import React from "react";

const CartContext = React.createContext({
  currency: "USD",
  cartItems: [],
});

export const CartProvider = CartContext.Provider;
export const CartConsumer = CartContext.Consumer;

export default CartContext;
