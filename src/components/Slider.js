import React, { Component } from "react";
import { StyledSlider } from "./styles/Slider.style";
import leftArrow from "../images/leftArrow.svg";
import rightArrow from "../images/rightArrow.svg";

class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideIndex: 1,
    };
  }

  nextSlide = () => {
    const { images } = this.props;
    const { slideIndex } = this.state;

    if (slideIndex !== images.length) {
      this.setState({ slideIndex: slideIndex + 1 });
    } else if (slideIndex === images.length) {
      this.setState({ slideIndex: 1 });
    }
  };

  prevSlide = () => {
    const { images } = this.props;
    const { slideIndex } = this.state;

    if (slideIndex !== 1) {
      this.setState({ slideIndex: slideIndex - 1 });
    } else if (slideIndex === 1) {
      this.setState({ slideIndex: images.length });
    }
  };

  render() {
    const { slideIndex } = this.state;
    const { images } = this.props;

    return (
      <StyledSlider>
        {images.map((image, index) => {
          return (
            <div
              key={image}
              className={
                slideIndex === index + 1 ? "slide active-anim" : "slide"
              }
            >
              <img src={image} alt="selected product" />
            </div>
          );
        })}
        <button onClick={this.nextSlide} className="slide-btn prev">
          <img src={leftArrow} alt="left arrow" />
        </button>
        <button onClick={this.prevSlide} className="slide-btn next">
          <img src={rightArrow} alt="right arrow" />
        </button>
      </StyledSlider>
    );
  }
}

export default Slider;
