import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import GlobalStyles from "./components/styles/Global";
import { ThemeProvider } from "styled-components";
import { Container } from "./components/styles/Container.style";
import Root from "./components/Root";

class App extends Component {
  client = new ApolloClient({
    uri: "http://localhost:4000/",
  });
  theme = {
    colors: {
      header: "#ebfbff",
      body: "#fff",
      footer: "#003333",
    },
  };

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <GlobalStyles />
        <ApolloProvider client={this.client}>
          <Container>
            <Root client={this.client} />
          </Container>
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}
export default App;
