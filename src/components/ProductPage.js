import { Component } from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import classNames from "classnames";
import gql from "graphql-tag";
import CartContext from "./CartContext";
import { StyledProductPage } from "./styles/ProductPage.style";

class ProductPage extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);

    this.state = {
      previewImg: "",
      selectedAttributes: [],
    };

    this.id = this.props.match.params.id.slice(1);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.client
      .query({
        query: gql`
      {
        product(id: "${this.id}") {
                id
                name
                gallery
                description
                attributes {
                  name
                  items {
                    value
                  }
                }
                prices {
                  currency {
                    label                    
                  }
                }
                brand
              }
      }
      `,
      })
      .then((result) => {
        const { gallery, attributes } = result.data.product;
        this.setState({
          previewImg: gallery[0],
        });

        if (attributes.length > 0) {
          const selectedAttributes = attributes.map(
            (attribute) => attribute.items[0].value
          );
          this.setState({
            selectedAttributes,
          });
        }
      });
  }

  handleSetAttribute = (value, index) => {
    let updatedAttributes = [...this.state.selectedAttributes];
    updatedAttributes[index] = value;
    this.setState({
      selectedAttributes: updatedAttributes,
    });
  };

  render() {
    const { previewImg } = this.state;
    const context = this.context;

    return (
      <Query
        query={gql`
        {
          product(id: "${this.id}") {
            id
            name
            brand
            inStock
            gallery
            description
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
      `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error! ${error.message}</p>;
          const { name, brand, description, gallery, prices, inStock } =
            data.product;
          const selectedCurrency = prices.find(
            (price) => price.currency.label === context.currency
          );
          return (
            <StyledProductPage>
              <div className="product">
                <div className="product-images">
                  <div className="product-images-list">
                    {gallery.map((image) => (
                      <div
                        className="product-images-list-item"
                        onMouseOver={() => this.setState({ previewImg: image })}
                        key={image}
                      >
                        <img src={image} alt="" />
                      </div>
                    ))}
                  </div>
                  <div className="product-images-main">
                    <img src={previewImg} alt="" />
                  </div>
                </div>
                <div className="product-info">
                  <h1 className="product-info-brand">{brand}</h1>
                  <h2 className="product-info-name">{name}</h2>

                  {data.product.attributes.length > 0 &&
                    data.product.attributes.map((attribute, index) => (
                      <div className="product-info-item" key={attribute.name}>
                        <h3 className="product-info-title">{`${attribute.name}:`}</h3>
                        <ul className="list">
                          {attribute.items.map((item) => (
                            <li
                              key={item.value}
                              className={classNames({
                                "list-item": attribute.name !== "Color",
                                "list-item-color": attribute.name === "Color",
                                "list-item-selected":
                                  attribute.name !== "Color" &&
                                  item.value ===
                                    this.state.selectedAttributes[index],
                                "list-item-color-selected":
                                  attribute.name === "Color" &&
                                  item.value ===
                                    this.state.selectedAttributes[index],
                              })}
                              onClick={() =>
                                this.handleSetAttribute(item.value, index)
                              }
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
                  <div className="product__info__item">
                    <h3 className="product-info-title">Price:</h3>
                    <p className="product-price">
                      {selectedCurrency.currency.symbol}
                      {selectedCurrency.amount}
                    </p>
                  </div>
                  <button
                    disabled={!inStock}
                    className={classNames({
                      "product-add-btn": inStock,
                      "product-add-btn-disabled": !inStock,
                    })}
                    onClick={() =>
                      context.handleAddToCart(
                        Object.assign(data.product, {
                          selectedAttributes: this.state.selectedAttributes,
                        })
                      )
                    }
                  >
                    {inStock ? "add to cart" : "out of stock"}
                  </button>
                  <div
                    className="product-description"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
              </div>
            </StyledProductPage>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ProductPage);
