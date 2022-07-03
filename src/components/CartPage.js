import { Component } from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import CartContext from "./CartContext";
import { getTotalItems, getTotalSum } from "./utils";
import { StyledCartPage } from "./styles/CartPage.style";
import plus from "../images/plus.svg";
import minus from "../images/minus.svg";
import Slider from "./Slider";

class CartPage extends Component {
  static contextType = CartContext;

  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
    };
  }

  componentDidMount() {
    this.props.client
      .query({
        query: gql`
          {
            currencies {
              label
              symbol
            }
          }
        `,
      })
      .then((result) => {
        this.setState({
          currencies: result.data.currencies,
        });
      });
  }

  render() {
    const context = this.context;
    const cartItems = this.context.cartItems;
    const totalItems = getTotalItems(cartItems);
    const totalSum = getTotalSum(this.context);
    const selectedCurrency = this.state.currencies.find(
      (currency) => currency.label === context.currency.label
    );

    return (
      <StyledCartPage>
        <h1 className="cart-title">cart</h1>
        {cartItems.length > 0 ? (
          <>
            <div className="products-container">
              {cartItems.map((cartItem) => {
                const selectedCurrency = cartItem.prices.filter(
                  (price) => price.currency.label === context.currency.label
                );
                return (
                  <>
                    <div className="product" key={cartItem.id}>
                      <div className="product-text-info">
                        <h2 className="product-brand">{cartItem.brand}</h2>
                        <h3 className="product-name">{cartItem.name} </h3>
                        <p className="product-price">
                          {selectedCurrency[0].currency.symbol}
                          {selectedCurrency[0].amount}
                        </p>
                        {cartItem.attributes.length > 0 &&
                          cartItem.attributes.map((attribute, index) => (
                            <div
                              className="product-info-item"
                              key={attribute.name}
                            >
                              <h3 className="product-info-title">{`${attribute.name}:`}</h3>
                              <ul className="list">
                                {attribute.items.map((item) => (
                                  <li
                                    key={item.value}
                                    className={classNames({
                                      "list-item": attribute.name !== "Color",
                                      "list-item-color":
                                        attribute.name === "Color",
                                      "list-item-selected":
                                        attribute.name !== "Color" &&
                                        item.value ===
                                          cartItem.selectedAttributes[index],
                                      "list-item-color-selected":
                                        attribute.name === "Color" &&
                                        item.value ===
                                          cartItem.selectedAttributes[index],
                                    })}
                                  >
                                    <div
                                      style={
                                        attribute.name === "Color"
                                          ? { backgroundColor: `${item.value}` }
                                          : null
                                      }
                                      className={classNames({
                                        "list-item-color-bg":
                                          attribute.name === "Color",
                                      })}
                                    >
                                      {attribute.name !== "Color" && item.value}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                      </div>
                      <div className="product-amount-container">
                        <div
                          className="product-amount-control"
                          onClick={() =>
                            context.updateQuantity("plus", cartItem.id)
                          }
                        >
                          <img src={plus} alt="plus icon" />
                        </div>
                        <div className="product-amount">
                          {" "}
                          {cartItem.amount}{" "}
                        </div>
                        <div
                          className="product-amount-control"
                          onClick={() =>
                            context.updateQuantity("minus", cartItem.id)
                          }
                        >
                          <img src={minus} alt="minus icon" />
                        </div>
                      </div>
                      <Slider images={cartItem.gallery} />
                    </div>
                    <div className="product-divider" />
                  </>
                );
              })}
            </div>

            <div className="cart-summary-container">
              <p className="summary-item">
                Tax 21%:{" "}
                <strong>
                  {selectedCurrency && selectedCurrency.symbol}
                  {((totalSum * 21) / 100).toFixed(2)}
                </strong>
              </p>
              <p className="summary-item">
                Quantity: <strong>{totalItems}</strong>
              </p>
              <p className="summary-item-bolder">
                Total:{" "}
                <strong>
                  {selectedCurrency && selectedCurrency.symbol}
                  {totalSum}
                </strong>
              </p>
              <button className="cart-order-btn">order</button>
            </div>
          </>
        ) : (
          <h2 className="cart-empty-title">The cart is empty.</h2>
        )}
      </StyledCartPage>
    );
  }
}

export default CartPage;
