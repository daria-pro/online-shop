import styled from "styled-components";

export const StyledProductPage = styled.div`
  padding-top: 112px;

  .product {
    display: flex;
  }

  .product-images {
    display: flex;
    width: 60%;
  }

  .product-images-list {
    margin-right: 40px;
  }

  .product-images-list-item {
    height: 80px;
    margin-bottom: 40px;
  }

  .product-images-list-item img {
    cursor: pointer;
    height: 100%;
  }

  .product-images-main {
    width: 610px;
    height: 511px;
    margin-right: 100px;
    display: flex;
    justify-content: flex-start;
  }

  .product-images-main img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  .product-info {
    max-width: 300px;
  }

  .product-info-brand {
    font-weight: 600;
    font-size: 30px;
    line-height: 27px;
    margin-bottom: 16px;
  }

  .product-info-name {
    font-weight: 400;
    font-size: 30px;
    line-height: 27px;
    margin-bottom: 43px;
  }

  .product-info-title {
    font-family: "Roboto Condensed";
    text-transform: uppercase;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
  }

  .list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
  }

  .list-item {
    padding: 14px 0;
    width: 70px;
    border: 1px solid #1d1f22;
    margin: 0 12px 12px 0;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    display: flex;
    justify-content: center;
  }

  .list-item:hover {
    background-color: #1d1f22;
    color: #fff;
    cursor: pointer;
  }

  .list-item-color {
    width: 36px;
    height: 36px;
    padding: 2px;
    margin-right: 8px;
  }

  .list-item-color-selected {
    border: 1px solid #5ece7b;
  }

  .list-item-color-bg {
    width: 36px;
    height: 36px;
  }

  .product-add-btn {
    color: #fff;
    background-color: #5ece7b;
    width: 100%;
    min-width: 300px;
    height: 52px;
    border: none;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
  }

  .product-add-btn:hover {
    opacity: 0.9;
  }
`;
