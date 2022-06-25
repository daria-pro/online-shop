import React, { Component } from "react";
import { StyledProductCard } from "./styles/ProductCard.style";
import whiteCart from "../images/white-cart.svg";
import CartContext from "./CartContext";
import { Link, withRouter } from "react-router-dom";

class ProductCard extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
    const { amount } = this.props.selectedCurrency[0];
    const { label, symbol } = this.props.selectedCurrency[0].currency;

    this.state = {
      amount: amount,
      currency: {
        label: label,
        symbol: symbol,
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedCurrency !== this.props.selectedCurrency) {
      this.setState({
        amount: this.props.selectedCurrency[0].amount,
        currency: {
          label: this.props.selectedCurrency[0].currency.label,
          symbol: this.props.selectedCurrency[0].currency.symbol,
        },
      });
    }
  }

  render() {
    const { gallery, name, inStock, id } = this.props.product;
    const context = this.context;
    const { url } = this.props.match;

    return (
      <>
        <StyledProductCard>
          <div className={!inStock ? "product-sold" : ""}>
            <div className="image-container">
              <Link className="router-link" to={`${url}/:${id}`} replace>
                <img src={gallery[0]} alt="product" className="product-image" />
              </Link>
              {inStock && (
                <div
                  className="cart-circle"
                  onClick={() => context.handleAddToCart(this.props.product)}
                >
                  <img src={whiteCart} alt="cart icon" />
                </div>
              )}

              {!inStock && (
                <h1 className="product-sold-message">out of stock</h1>
              )}
            </div>
            <Link className="router-link" to={`${url}/:${id}`} replace>
              <h2 className="product-name">{name}</h2>
              <div className="price">
                <p>{this.state.currency.symbol}</p>
                <p>{this.state.amount}</p>
              </div>
            </Link>
          </div>
        </StyledProductCard>
      </>
    );
  }
}

export default withRouter(ProductCard);
