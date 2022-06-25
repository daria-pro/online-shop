import styled from "styled-components";

export const StyledSlider = styled.div`
  width: 200px;
  height: 288px;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 700px) {
    .container-slider {
      margin: 100px 10px 0;
    }
  }
  .slide {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    transition: opacity ease-in-out 0.4s;
  }
  .slide img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
  .active-anim {
    opacity: 1;
  }

  .slide-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    height: 24px;
    width: 24px;
    position: absolute;
    opacity: 0.73;
    cursor: pointer;
    border: none;
  }

  .next {
    bottom: 16px;
    right: 16px;
  }

  .prev {
    bottom: 16px;
    right: 48px;
  }
`;
