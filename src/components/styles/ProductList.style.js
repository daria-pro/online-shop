import styled from "styled-components";

export const StyledProductListPage = styled.main`
  h1 {
    font-weight: 400;
    font-size: 42px;
    line-height: 160%;
    padding: 103px 1px;
    margin: 0;
    text-transform: capitalize;
  }
`;

export const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: auto;
  grid-row-gap: 70px;
  justify-items: center;
`;
