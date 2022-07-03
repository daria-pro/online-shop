import { Component, createRef } from "react";
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
    context.setCurrency(currency);
  };

  render() {
    const { isOpen } = this.state;
    const { currencies } = this.props;
    const selectedCurrency = this.context.currency;

    return (
      <StyledCurrencySelector>
        <div className="currency-label-container" onClick={this.toggle}>
          <h3 className="currency-label">
            {selectedCurrency && selectedCurrency.symbol}
          </h3>
          <img src={arrowDown} alt="arrow down" />
        </div>
        {isOpen && (
          <div className="currency-list-container" ref={this.currencyRef}>
            <ul className="currency-list">
              {currencies.map((currency) => (
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
      </StyledCurrencySelector>
    );
  }
}

export default CurrencySelector;
