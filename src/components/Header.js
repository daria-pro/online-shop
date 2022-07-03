import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import gql from "graphql-tag";
import CartContext from "./CartContext";
import CurrencySelector from "./CurrencySelector";
import CartPopup from "./CartPopup";
import { StyledHeader } from "./styles/Header.style";
import emptyCart from "../images/empty-cart.svg";
import logo from "../images/a-logo.svg";

class Header extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
    this.state = {
      isCartOpen: false,
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

  getTotalItems = () => {
    const context = this.context;
    const items = context.cartItems;
    if (items) {
      return items.reduce((ack, item) => ack + item.amount, 0);
    }
    return 0;
  };

  render() {
    const totalItems = this.getTotalItems();
    const { pathname } = this.props.location;
    const { currencies } = this.state;

    return (
      <StyledHeader>
        <div className="categories">
          {this.props.categories.map((category) => (
            <NavLink
              to={`/${category}`}
              key={category}
              className="nav-link"
              activeClassName="nav-link-active"
            >
              {category}
            </NavLink>
          ))}
        </div>
        <img src={logo} alt="logo-icon" className="logo" />
        <div className="cart-info-items">
          <CurrencySelector currencies={currencies} />
          <div className="cart-icon-container">
            <Link to={`${pathname}?cart=true`}>
              <img
                src={emptyCart}
                alt="empty cart icon"
                className="cart-icon"
              />
              <div className="cart-items-circle">{totalItems}</div>
            </Link>
            {this.props.location.search === "?cart=true" && <CartPopup />}
          </div>
        </div>
      </StyledHeader>
    );
  }
}

export default withRouter(Header);
