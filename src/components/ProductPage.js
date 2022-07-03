import { Component } from "react";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import gql from "graphql-tag";
import parse from "html-react-parser";
import CartContext from "./CartContext";
import { StyledProductPage } from "./styles/ProductPage.style";

class ProductPage extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);

    this.state = {
      previewImg: "",
      selectedAttributes: [],
      product: {},
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
      `,
      })
      .then((result) => {
        const { gallery, attributes } = result.data.product;

        this.setState({
          previewImg: gallery[0],
          product: result.data.product,
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
    const { previewImg, product } = this.state;
    const context = this.context;
    const { brand, name, description, inStock, prices, gallery } =
      this.state.product;
    const selectedCurrency =
      prices &&
      prices.find((price) => price.currency.label === context.currency.label);

    return (
      <StyledProductPage>
        <div className="product">
          <div className="product-images">
            <div className="product-images-list">
              {gallery &&
                gallery.map((image) => (
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

            {product.attributes &&
              product.attributes.length > 0 &&
              product.attributes.map((attribute, index) => (
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
                            item.value === this.state.selectedAttributes[index],
                          "list-item-color-selected":
                            attribute.name === "Color" &&
                            item.value === this.state.selectedAttributes[index],
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
                            "list-item-color-bg": attribute.name === "Color",
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
              {selectedCurrency && (
                <p className="product-price">
                  {selectedCurrency.currency.symbol}
                  {selectedCurrency.amount}
                </p>
              )}
            </div>
            <button
              disabled={!inStock}
              className={classNames({
                "product-add-btn": inStock,
                "product-add-btn-disabled": !inStock,
              })}
              onClick={() =>
                context.handleAddToCart(
                  Object.assign(product, {
                    selectedAttributes: this.state.selectedAttributes,
                  })
                )
              }
            >
              {inStock ? "add to cart" : "out of stock"}
            </button>
            <div className="product-description">
              {description && parse(description)}
            </div>
          </div>
        </div>
      </StyledProductPage>
    );
  }
}

export default withRouter(ProductPage);
