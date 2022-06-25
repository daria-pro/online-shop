import styled from "styled-components";

export const StyledCartPopup = styled.div`
  .popup-content {
    position: absolute;
    right: -15px;
    top: 50px;
    filter: drop-shadow(0px 4px 35px rgba(0, 0, 0, 0.19));
    width: 325px;
    max-height: 677px;
    background-color: #fff;
    padding: 32px 16px;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    cursor: default;

    z-index: 2;
  }

  .popup-content::-webkit-scrollbar {
    display: none;
  }

  .popup-header-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  .popup-title-text {
    font-weight: 700;
    font-size: 16px;
    line-height: 160%;
  }

  .popup-title-regular-fw {
    font-weight: 500;
  }

  .product {
    margin-bottom: 22px;
    display: flex;
    justify-content: space-between;
  }

  .product-title {
    font-weight: 300;
    font-size: 16px;
    line-height: 160%;
    margin-bottom: 4px;
  }

  .product-price {
    font-weight: 500;
    font-size: 16px;
    line-height: 160%;
  }

  .product-attribute-name {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    margin: 8px 0;
  }

  .list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
  }

  .list-item {
    min-width: 24px;
    width: fit-content;
    padding: 0 2px;
    border: 1px solid #1d1f22;
    margin: 0 12px 10px 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    display: flex;
    justify-content: center;
  }

  .list-item:hover {
    background-color: #1d1f22;
    color: #fff;
    cursor: pointer;
  }

  .list-item-selected {
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
    margin-right: 8px;
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
    height: 190px;
  }

  .product-amount-control {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    font-size: 24px;
    border: 1px solid #1d1f22;
    cursor: pointer;
  }

  .product-amount-control img {
    height: 13px;
    width: 13px;
  }

  .product-img-container {
    width: 121px;
    height: 190px;
  }

  .product-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }

  .product-info {
    width: 136px;
  }

  .popup-close-cross {
    width: 16px;
    cursor: pointer;
  }

  .popup-buttons-container {
    display: flex;
    justify-content: space-between;
  }

  .popup-white-btn {
    width: 140px;
    height: 43px;
    background: #fff;
    color: #1d1f22;
    border: 1px solid #1d1f22;
    text-transform: uppercase;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
  }

  .popup-white-btn:hover {
    cursor: pointer;
    background: #000;
    color: #fff;
  }

  .popup-green-btn {
    width: 140px;
    height: 43px;
    color: #fff;
    background: #5ece7b;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
  }

  .popup-green-btn:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;
