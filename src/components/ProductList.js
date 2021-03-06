import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ProductCard from "./ProductCard";

import { StyledProductListPage } from "./styles/ProductList.style";
import { ProductContainer } from "./styles/ProductList.style";
import CartContext from "./CartContext";
import { withRouter } from "react-router";

class ProductList extends Component {
  static contextType = CartContext;

  category = this.props.match.params;

  query = gql`
    {
      category(input: { title: "${this.props.category}" }) {
        name
        products {
          id
          name
          brand
          inStock
          gallery
          attributes {
            name
            items {
              value
            }
          }
          prices {
            currency {
              symbol
              label
            }
            amount
          }
        }
      }
    }
  `;

  render() {
    const context = this.context;

    return (
      <>
        <Query query={this.query}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error! ${error.message}</p>;

            const { name, products } = data.category;

            return (
              <StyledProductListPage>
                <h1>{name}</h1>
                <ProductContainer>
                  {products.map((product) => {
                    const selectedCurrency = product.prices.filter(
                      (price) => price.currency.label === context.currency.label
                    );
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        selectedCurrency={selectedCurrency}
                        selectedCategory={this.props.category}
                      />
                    );
                  })}
                </ProductContainer>
              </StyledProductListPage>
            );
          }}
        </Query>
      </>
    );
  }
}
export default withRouter(ProductList);
