import styled from "styled-components";

export const StyledCartPage = styled.div`
  .cart-title {
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    text-transform: uppercase;
    padding: 80px 0 55px;
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
    align-items: center;
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
    margin-bottom: 8px;
  }

  .list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
  }

  .list-item {
    min-width: 63px;
    width: fit-content;
    padding: 12px 0;
    border: 1px solid #1d1f22;
    margin: 0 8px 16px 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    display: flex;
    justify-content: center;
  }

  .list-item-selected,
  .list-item:hover {
    background-color: #1d1f22;
    color: #fff;
    cursor: pointer;
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
    cursor: pointer;
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
    padding: 8px 0 16px;
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
    margin-bottom: 30px;
  }
`;
