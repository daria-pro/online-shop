import { Component, createRef } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { StyledCurrencySelector } from "./styles/CurrencySelector.style";
import arrowDown from "../images/arrow-down.svg";
import CartContext from "./CartContext";

class CurrencySelector extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedCurrency: "$",
    };

    this.currencyRef = createRef();
  }

  query = gql`
    {
      currencies {
        symbol
        label
      }
    }
  `;

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.currencyRef && !this.currencyRef.current.contains(event.target)) {
      this.toggle();
    }
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleCurrencySelect = (currency) => {
    const context = this.context;
    this.setState({
      isOpen: !this.state.isOpen,
      selectedCurrency: currency.symbol,
    });
    context.setCurrency(currency.label);
  };

  render() {
    const { isOpen } = this.state;

    return (
      <StyledCurrencySelector>
        <Query query={this.query}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: ${error.message}'</p>;
            const selectedCurrency = data.currencies.find(
              (currency) => currency.label === this.context.currency
            );

            return (
              <>
                <div className="currency-label-container" onClick={this.toggle}>
                  <h3 className="currency-label">
                    {selectedCurrency && selectedCurrency.symbol}
                  </h3>
                  <img src={arrowDown} alt="arrow down" />
                </div>
                {isOpen && (
                  <div
                    className="currency-list-container"
                    ref={this.currencyRef}
                  >
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
