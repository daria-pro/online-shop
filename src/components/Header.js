import React, { Component } from "react";
import { StyledHeader } from "./styles/Header.style";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import logo from "../images/a-logo.svg";
import emptyCart from "../images/empty-cart.svg";
import { NavLink } from "react-router-dom";
import CurrencySelector from "./CurrencySelector";
import CartContext from "./CartContext";

class Header extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
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

    return (
      <StyledHeader>
        <div className="categories">
          <Query
            query={gql`
              {
                categories {
                  name
                }
              }
            `}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error: {error.message}</p>;
              return data.categories.map((category) => (
                <NavLink
                  to={`/${category.name}`}
                  key={category.name}
                  className="nav-link"
                  activeClassName="nav-link-active"
                >
                  {category.name}
                </NavLink>
              ));
            }}
          </Query>
        </div>
        <img src={logo} alt="logo-icon" className="logo" />
        <div className="cart-info-items">
          <CurrencySelector />
          <div className="cart-icon-container">
            <img src={emptyCart} alt="empty cart icon" className="cart-icon" />
            <div className="cart-items-circle">{totalItems}</div>
          </div>
        </div>
      </StyledHeader>
    );
  }
}

export default Header;
