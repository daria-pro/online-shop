import { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { CartProvider } from "./CartContext";
import CartPage from "./CartPage";
import Header from "./Header";
import ProductList from "./ProductList";
import ProductPage from "./ProductPage";
import { getCurrency, getItemsFromLocalStorage } from "./utils";

class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: "USD",
      cartItems: [],
      setCurrency: this.setCurrency,
      handleAddToCart: this.handleAddToCart,
      handleSetAttribute: this.handleSetAttribute,
      updateQuantity: this.updateQuantity,
    };
  }

  componentDidMount() {
    const cartItems = getItemsFromLocalStorage();
    const selectedCurrency = getCurrency();

    if (cartItems) {
      this.setState({
        cartItems: [...cartItems],
      });
    } else {
      localStorage.setItem("cartItems", []);
    }

    if (selectedCurrency) {
      this.setState({
        currency: selectedCurrency,
      });
    } else {
      localStorage.setItem("selectedCurrency", "");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cartItems !== this.state.cartItems) {
      localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
    }
    if (prevState.currency !== this.state.currency) {
      localStorage.setItem(
        "selectedCurrency",
        JSON.stringify(this.state.currency)
      );
    }
  }

  setCurrency = (currency) => {
    this.setState({
      currency,
    });
  };

  handleAddToCart = (clickedItem) => {
    this.setState((prev) => {
      const isItemInCart = prev.cartItems.find(
        (item) => item.id === clickedItem.id
      );

      if (isItemInCart) {
        return prev.cartItems.map((item) =>
          item.id === clickedItem.id ? { ...item, amount: item.amount++ } : item
        );
      }

      if (
        !clickedItem.hasOwnProperty("selectedAttributes") &&
        clickedItem.attributes.length > 0
      ) {
        const attributes = clickedItem.attributes.map(
          (attribute) => attribute.items[0].value
        );

        return {
          cartItems: [
            ...prev.cartItems,
            { ...clickedItem, amount: 1, selectedAttributes: attributes },
          ],
        };
      }
      return { cartItems: [...prev.cartItems, { ...clickedItem, amount: 1 }] };
    });
  };

  handleSetAttribute = (cartItemId, value, index) => {
    let selectedCartItem = this.state.cartItems.find(
      (item) => item.id === cartItemId
    );
    let updatedAttributes = [...selectedCartItem.selectedAttributes];
    updatedAttributes[index] = value;

    this.setState((prev) => {
      const items = prev.cartItems.map((item) =>
        item.id === selectedCartItem.id
          ? {
              ...item,
              selectedAttributes: updatedAttributes,
            }
          : item
      );
      return {
        ...prev,
        cartItems: items,
      };
    });
  };

  updateQuantity = (type, cartItemId) => {
    if (type === "plus") {
      this.setState((prev) => {
        return prev.cartItems.map((item) =>
          item.id === cartItemId ? { ...item, amount: item.amount++ } : item
        );
      });
    } else {
      let selectedCartItem = this.state.cartItems.find(
        (item) => item.id === cartItemId
      );
      if (selectedCartItem.amount - 1 < 1) {
        this.setState((prev) => {
          const cartItems = prev.cartItems.filter(
            (item) => item.id !== cartItemId
          );
          return {
            cartItems,
          };
        });
      }
      this.setState((prev) => {
        return prev.cartItems.map((item) =>
          item.id === cartItemId ? { ...item, amount: item.amount-- } : item
        );
      });
    }
  };

  render() {
    return (
      <CartProvider value={this.state}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Redirect to="/all" />
            </Route>
            <Route exact path="/all">
              <ProductList category="all" />
            </Route>
            <Route exact path="/clothes">
              <ProductList category="clothes" />
            </Route>
            <Route exact path="/tech">
              <ProductList category="tech" />
            </Route>
            <Route path="/(all|clothes|tech)/:id">
              <ProductPage client={this.props.client} />
            </Route>
            <Route exact path="/cart">
              <CartPage client={this.props.client} />
            </Route>
          </Switch>
        </Router>
      </CartProvider>
    );
  }
}

export default Root;
