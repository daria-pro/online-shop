import styled from "styled-components";

export const StyledCurrencySelector = styled.div`
  display: block;
  position: relative;
  width: 65px;
  height: 18px;

  .currency-label-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    cursor: pointer;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    font-weight: 500;
  }

  .currency-label {
    font-weight: 500;
    font-size: 18px;
    margin: 0 10px;
  }

  .currency-list-container {
    position: relative;
    display: block;
    width: 115px;
    filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
  }

  .currency-list {
    position: absolute;
    top: 35px;
    left: -8px;
    width: 100%;
    padding: 0;
    margin: 0;
    padding: 12px 0;
    background: #ffffff;
    border: 1px solid $color-secondary-300;
    border-radius: $border-radius;
    box-sizing: border-box;
    font-weight: 500;
    z-index: 2;
  }

  .currency-list-item {
    list-style: none;
    padding: 8px 0 8px 20px;
    cursor: pointer;
  }

  .currency-list-item:hover {
    background-color: #eeeeee;
  }
`;
