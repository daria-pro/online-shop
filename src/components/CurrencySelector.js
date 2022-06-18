import { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { StyledCurrencySelector } from "./styles/CurrencySelector.style";
import arrowDown from "../images/arrow-down.svg";
import arrowUp from "../images/arrow-up.svg";
import CartContext from "./CartContext";

class CurrencySelector extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedCurrency: "$",
    };
    this.toggle = this.toggle.bind(this);
    this.handleCurrencySelect = this.handleCurrencySelect.bind(this);
  }

  query = gql`
    {
      currencies {
        symbol
        label
      }
    }
  `;

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handleCurrencySelect(currency) {
    const context = this.context;
    this.setState({
      isOpen: !this.state.isOpen,
      selectedCurrency: currency.symbol,
    });
    context.setCurrency(currency.label);
  }

  render() {
    const { isOpen, selectedCurrency } = this.state;

    return (
      <StyledCurrencySelector>
        <Query query={this.query}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: ${error.message}'</p>;
            return (
              <>
                <div className="currency-label-container" onClick={this.toggle}>
                  <h3 className="currency-label">{selectedCurrency}</h3>
                  <img src={arrowDown} alt="arrow down" />
                </div>
                {isOpen && (
                  <div className="currency-list-container">
                    <ul className="currency-list">
                      {data.currencies.map((currency) => (
                        <li
                          className="currency-list-item"
                          key={currency.label}
                          value={currency.label}
                          onClick={() => this.handleCurrencySelect(currency)}
                        >
                          {`${currency.symbol} ${currency.label}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            );
          }}
        </Query>
      </StyledCurrencySelector>
    );
  }
}

export default CurrencySelector;
