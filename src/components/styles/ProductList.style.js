import styled from "styled-components";

export const StyledProductListPage = styled.main`
  h1 {
    font-weight: 400;
    font-size: 42px;
    line-height: 160%;
    padding: 160px 1px 103px;
    margin: 0;
    text-transform: capitalize;
  }
`;

export const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 40px;
  grid-row-gap: 103px;
  justify-items: center;
`;
