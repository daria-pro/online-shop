import { Component } from "react";
import classNames from "classnames";
import CartContext from "./CartContext";
import { StyledCartPopup } from "./styles/CartPopup.style";
import plus from "../images/plus.svg";
import minus from "../images/minus.svg";
import { createRef } from "react";
import { Link, withRouter } from "react-router-dom";
import cross from "../images/cross.svg";
import { getTotalItems, getTotalSum } from "./utils";

class CartPopup extends Component {
  static contextType = CartContext;
  pathname = this.props.location.pathname;

  constructor(props) {
    super(props);

    this.state = {
      selectedAttributes: null,
    };

    this.cartRef = createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.cartRef && !this.cartRef.current.contains(event.target)) {
      this.props.history.push(this.pathname);
    }
  };

  handleClose = () => {
    this.props.history.push(this.pathname);
  };

  render() {
    const context = this.context;
    const cartItems = context.cartItems;
    const totalItems = getTotalItems(cartItems);
    const totalSum = getTotalSum(context);
    const selectedCurrency = context.currency;

    return (
      <>
        <StyledCartPopup>
          <div className="popup-backdrop"></div>
          <div className="popup-content" ref={this.cartRef}>
            <div className="popup-header-container">
              <h2 className="popup-title-text">
                My Bag,{" "}
                <span className="popup-title-regular-fw">
                  {totalItems} items
                </span>
              </h2>
              <img
                alt="cross icon"
                src={cross}
                className="popup-close-cross"
                onClick={this.handleClose}
              />
            </div>
            {cartItems &&
              cartItems.map((cartItem) => {
                const selectedCurrency = cartItem.prices.filter(
                  (price) => price.currency.label === context.currency.label
                );

                return (
                  <div className="product" key={cartItem.id}>
                    <div className="product-info">
                      <p className="product-title">
                        {cartItem.brand}
                        <br />
                        {cartItem.name}
                      </p>
                      <p className="product-price">
                        {selectedCurrency[0].currency.symbol}
                        {selectedCurrency[0].amount}
                      </p>
                      {cartItem.attributes.length > 0 &&
                        cartItem.attributes.map((attribute, index) => (
                          <div className="product-attribute" key={index}>
                            <h3 className="product-attribute-name">{`${attribute.name}:`}</h3>
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
                                        ? {
                                            backgroundColor: `${item.value}`,
                                          }
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
                      <div className="product-amount"> {cartItem.amount} </div>
                      <div
                        className="product-amount-control"
                        onClick={() =>
                          context.updateQuantity("minus", cartItem.id)
                        }
                      >
                        <img src={minus} alt="minus icon" />
                      </div>
                    </div>
                    <div className="product-img-container">
                      <img
                        className="product-img"
                        src={cartItem.gallery[0]}
                        alt={cartItem.name}
                      />
                    </div>
                  </div>
                );
              })}
            <div className="popup-total">
              <p>Total:</p>
              <p className="popup-sum">
                {selectedCurrency.symbol}
                {totalSum}
              </p>
            </div>
            <div className="popup-buttons-container">
              <Link to="/cart">
                <button className="popup-white-btn">view bag</button>
              </Link>
              <Link to="/cart">
                <button className="popup-green-btn">check out</button>
              </Link>
            </div>
          </div>
        </StyledCartPopup>
      </>
    );
  }
}

export default withRouter(CartPopup);
