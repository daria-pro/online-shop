import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { Query } from "react-apollo";
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
    };
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
            <Link to={`${pathname}?cart=true`}>
              <img
                src={emptyCart}
                alt="empty cart icon"
                className="cart-icon"
              />
            </Link>
            <div className="cart-items-circle">{totalItems}</div>
            {this.props.location.search === "?cart=true" && <CartPopup />}
          </div>
        </div>
      </StyledHeader>
    );
  }
}

export default withRouter(Header);
