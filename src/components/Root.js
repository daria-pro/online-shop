import { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { CartProvider } from "./CartContext";
import Header from "./Header";
import ProductList from "./ProductList";
import ProductPage from "./ProductPage";
import { getItemsFromLocalStorage } from "./utils";

class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: "USD",
      cartItems: [],
      setCurrency: this.setCurrency,
      handleAddToCart: this.handleAddToCart,
    };
  }

  componentDidMount() {
    const cartItems = getItemsFromLocalStorage();
    if (cartItems) {
      this.setState({
        cartItems: [...cartItems],
      });
    } else {
      localStorage.setItem("cartItems", []);
    }
  }

  componentDidUpdate() {
    localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
  }

  setCurrency = (currency) => {
    this.setState({
      currency,
    });
  };

  handleAddToCart = (clickedItem) => {
    this.setState((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.cartItems.find(
        (item) => item.id === clickedItem.id
      );

      if (isItemInCart) {
        return prev.cartItems.map((item) =>
          item.id === clickedItem.id ? { ...item, amount: item.amount++ } : item
        );
      }
      // First time the item is added
      return { cartItems: [...prev.cartItems, { ...clickedItem, amount: 1 }] };
    });
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
          </Switch>
        </Router>
      </CartProvider>
    );
  }
}

export default Root;
