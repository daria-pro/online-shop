import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap')

  * {
    box-sizing: border-box;
    background: white;
  }

  body {
    font-family: 'Raleway', sans-serif;
    color: #1D1F22;
  }

  h1, h2, p {
    margin: 0;
  }
`;

export default GlobalStyles;
