import styled from "styled-components";

export const StyledCartPage = styled.div`
  * {
    box-sizing: border-box;
  }

  .cart-title {
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    text-transform: uppercase;
    padding: 160px 0 0;
  }

  .cart-title:after {
    content: "";
    margin-top: 55px;
    display: block;
    height: 1px;
    background-color: #e5e5e5;
    width: 100wh;
  }

  .product {
    display: flex;
    align-items: flex-start;
  }

  .products-container {
    padding: 24px 0 0;
  }

  .product-divider {
    margin: 24px 0;
    display: block;
    height: 1px;
    background-color: #e5e5e5;
    width: 100wv;
  }

  .product-text-info {
    flex: 1;
  }

  .product-brand {
    font-weight: 600;
    font-size: 30px;
    line-height: 27px;
    margin-bottom: 16px;
  }

  .product-name {
    font-weight: 400;
    font-size: 30px;
    line-height: 27px;
    margin-bottom: 20px;
  }

  .product-price {
    font-weight: 700;
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 20px;
  }

  .product-info-title {
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    font-family: "Roboto Condensed";
    text-transform: uppercase;
    margin-bottom: 7px;
  }

  .list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    font-family: "Source Sans Pro", sans-serif;
  }

  .list-item {
    min-width: 63px;
    width: fit-content;
    height: 45px;
    border: 1px solid #1d1f22;
    margin: 0 8px 16px 0;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .list-item-selected {
    background-color: #1d1f22;
    color: #fff;
  }

  .list-item-color {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    margin: 0 8px 16px 0;
  }

  .list-item-color-bg {
    width: 32px;
    height: 32px;
    margin: 2px;
  }

  .list-item-color-selected {
    border: 1px solid #5ece7b;
  }

  .product-amount-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 288px;
    margin-right: 24px;
  }

  .product-amount-control {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    font-size: 24px;
    border: 1px solid #1d1f22;
    cursor: pointer;
  }

  .product-amount-control img {
    height: 18px;
    width: 18px;
  }

  .product-amount {
    font-weight: 500;
    font-size: 24px;
    line-height: 160%;
  }

  .cart-summary-container {
    font-size: 24px;
    line-height: 28px;
    font-weight: 400;
    padding-top: 8px;
  }

  .summary-item {
    margin-bottom: 8px;
  }

  .summary-item-bolder {
    font-weight: 500;
    margin-bottom: 16px;
  }

  .cart-order-btn {
    width: 279px;
    height: 43px;
    background: #5ece7b;
    border: none;
    text-transform: uppercase;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
  }

  .cart-order-btn:hover {
    opacity: 0.9;
    cursor: pointer;
  }

  .cart-empty-title {
    text-align: center;
    margin: 30px auto;
  }
`;
