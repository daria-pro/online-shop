import { Component } from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import classNames from "classnames";
import gql from "graphql-tag";
import { StyledProductPage } from "./styles/ProductPage.style";

class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previewImg: "",
      selectedColor: "",
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
        this.setState({
          previewImg: result.data.product.gallery[0],
        });

        const colorAttribute = result.data.product.attributes.find(
          (attribute) => attribute.name === "Color"
        );

        if (colorAttribute) {
          this.setState({
            selectedColor: colorAttribute.items[0].value,
          });
        }
      });
  }

  render() {
    const { previewImg } = this.state;

    return (
      <Query
        query={gql`
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
      `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error! ${error.message}</p>;
          const { name, brand, description, gallery } = data.product;

          return (
            <StyledProductPage>
              <div className="product">
                <div className="product-images">
                  <div className="product-images-list">
                    <div
                      className="product-images-list-item"
                      onClick={() => this.setState({ previewImg: gallery[0] })}
                    >
                      <img src={gallery[0]} alt="" />
                    </div>
                    <div
                      className="product-images-list-item"
                      onClick={() => this.setState({ previewImg: gallery[1] })}
                    >
                      <img src={gallery[1]} alt="" />
                    </div>
                    <div
                      className="product-images-list-item"
                      onClick={() => this.setState({ previewImg: gallery[2] })}
                    >
                      <img src={gallery[2]} alt="" />
                    </div>
                  </div>
                  <div className="product-images-main">
                    <img src={previewImg} alt="" />
                  </div>
                </div>
                <div className="product-info">
                  <h1 className="product-info-brand">{brand}</h1>
                  <h2 className="product-info-name">{name}</h2>

                  {data.product.attributes.length > 0 &&
                    data.product.attributes.map((attribute) => (
                      <div className="product-info-item">
                        <h3 className="product-info-title">{`${attribute.name}:`}</h3>
                        <ul className="list">
                          {attribute.items.map((item) => (
                            <li
                              key={item.value}
                              className={classNames({
                                "list-item": attribute.name !== "Color",
                                "list-item-color": attribute.name === "Color",
                                "list-item-color-selected":
                                  this.state.selectedColor === item.value,
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
                  <div className="product__info__item">
                    <span className="product__info__item__price">
                      {/* {numberWithCommas(product.price)} */}
                    </span>
                  </div>
                  <div className="product__info__item">
                    {/* <div className="product__info__item__title">Kích cỡ</div> */}
                    <div className="product__info__item__list">
                      {/* {product.size.map((item, index) => (
                        <div
                          key={index}
                          className={`product__info__item__list__item ${
                            size === item ? "active" : ""
                          }`}
                          onClick={() => setSize(item)}
                        >
                          <span className="product__info__item__list__item__size">
                            {item}
                          </span>
                        </div>
                      ))} */}
                    </div>
                  </div>
                  <div className="product__info__item">
                    {/* <div className="product__info__item__title">Số lượng</div> */}
                    <div className="product__info__item__quantity">
                      <div
                        className="product__info__item__quantity__btn"
                        // onClick={() => updateQuantity("minus")}
                      >
                        <i className="bx bx-minus"></i>
                      </div>
                      <div className="product__info__item__quantity__input">
                        {/* {quantity} */}
                      </div>
                      <div
                        className="product__info__item__quantity__btn"
                        // onClick={() => updateQuantity("plus")}
                      >
                        <i className="bx bx-plus"></i>
                      </div>
                    </div>
                  </div>
                  <div className="product__info__item">
                    <button className="product-add-btn">add to cart</button>
                    {/* <Button onClick={() => addToCart()}>thêm vào giỏ</Button>
                    <Button onClick={() => goToCart()}>mua ngay</Button> */}
                  </div>
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
