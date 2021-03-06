import styled from "styled-components";

export const StyledHeader = styled.header`
  padding: 20px 0 20px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1238px;
  position: fixed;
  z-index: 3;

  .categories {
    display: flex;
    flex: 1;
  }

  .nav-link {
    position: relative;
    font-weight: 400;
    padding: 0 16px;
    line-height: 120%;
    text-transform: uppercase;
    text-decoration: none;
  }

  .nav-link:visited {
    color: inherit;
  }

  .nav-link:hover {
    color: #5ece7b;
  }

  .nav-link-active {
    color: #5ece7b !important;
  }

  .nav-link-active:after {
    position: absolute;
    content: "";
    height: 3px;
    background-color: #5ece7b;
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: -30px;
    width: 100%;
  }

  .logo {
    max-width: 40px;
    flex: 10;
    justify-content: center;
  }

  .cart-info-items {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
  }

  .currency-icon {
    height: 30px;
    margin-right: 22px;
  }

  .cart-icon-container {
    height: 21px;
    position: relative;
    cursor: pointer;
  }

  .cart-icon {
    height: 21px;
    color: black;
  }

  .cart-items-circle {
    position: absolute;
    height: 22px;
    width: 22px;
    background-color: #1d1f22;
    border-radius: 60px;
    top: -50%;
    right: -75%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-family: "Roboto";
    font-weight: 700;
    font-size: 14px;
    line-height: 30px;
  }

  .popup-container {
    height: 677px;
  }
`;
