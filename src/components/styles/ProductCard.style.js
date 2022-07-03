import styled from "styled-components";

export const StyledProductCard = styled.div`
  font-family: "Raleway", sans-serif;
  background: white;
  padding: 0 16px;
  min-width: 100%;
  max-width: 386px;
  box-sizing: border-box;

  &:hover {
    filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
    cursor: pointer;
  }

  &:hover .cart-circle {
    opacity: 1;
  }

  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product-image {
    max-width: 354px;
    height: 330px;
    object-fit: contain;
    padding: 16px 0 0;
    position: relative;
    z-index: 0;
  }

  .product-sold-message {
    position: absolute;
    color: #8d8f9a;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -58%);
    text-transform: uppercase;
    font-weight: 400;
    font-size: 24px;
    line-height: 160%;
    width: fit-content;
  }

  .product-sold {
    opacity: 0.5;
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
  }

  .product-name {
    font-weight: 300;
    font-size: 18px;
    line-height: 160%;
    margin: 22px auto 0;
    padding: 0;
  }

  .cart-circle {
    opacity: 0;
    position: absolute;
    right: 31px;
    bottom: 72px;
    width: 52px;
    height: 52px;
    border-radius: 50px;
    background-color: #5ece7b;
    filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .cart-circle: hover {
    opacity: 0.85;
  }

  .price {
    display: flex;
    font-weight: 500;
    font-size: 18px;
    padding-bottom: 16px;
  }

  .price > p {
    line-height: 160%;
  }

  .router-link {
    text-decoration: none;
    color: inherit;
  }
`;
