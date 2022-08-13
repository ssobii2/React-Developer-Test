import React, { Component } from "react";

export default class CartProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
    };
  }

  nextImage = () => {
    if (this.state.currentImage < this.props.product.gallery.length - 1) {
      this.setState({ currentImage: this.state.currentImage + 1 });
    }
  };

  prevImage = () => {
    if (this.state.currentImage > 0) {
      this.setState({ currentImage: this.state.currentImage - 1 });
    }
  };

  render() {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="info-cart">
            <h3>{this.props.product.name}</h3>
            <h3 className="mb">
              {/* eslint-disable-next-line */}
              {this.props.product.prices.map((price, index) => {
                if (price.currency.symbol === this.props.currentCurrency) {
                  return (
                    <b key={index}>
                      {price.currency.symbol} {price.amount}
                    </b>
                  );
                }
              })}
            </h3>
            {/* eslint-disable-next-line */}
            {this.props.product.attributes.map((attribute, index) => {
              if (attribute.type === "text") {
                return (
                  <>
                    <h4 className="mb" key={index}>
                      {attribute.name}:
                    </h4>
                    {/* eslint-disable-next-line */}
                    {attribute.items.map((item, index) => {
                      return (
                        <button className="size-btn" key={index}>
                          {item.value}
                        </button>
                      );
                    })}
                  </>
                );
              }
            })}
            {/* eslint-disable-next-line */}
            {this.props.product.attributes.map((attribute, index) => {
              if (attribute.type === "swatch") {
                return (
                  <>
                    <h4 key={index} className="mb">
                      {attribute.name}:
                    </h4>
                    <div className="boxes">
                      {attribute.items.map((item, index) => {
                        return (
                          <div
                            className={
                              this.props.color.includes(item.id)
                                ? "boxes-div active-color"
                                : "boxes-div"
                            }
                            key={index}
                            style={{
                              backgroundColor: item.value,
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  </>
                );
              }
            })}
          </div>
          <div className="minus-plus-btn">
            <div className="m-p-btn">
              <button
                onClick={() => this.props.plusButton(this.props.product.id)}
              >
                +
              </button>
              <p>{this.props.product.quantity}</p>
              <button
                onClick={() => this.props.minusButton(this.props.product.id)}
              >
                -
              </button>
            </div>
            <div className="container">
              <img
                style={{ paddingLeft: "10px" }}
                src={this.props.product.gallery[this.state.currentImage]}
                alt="product"
                width="250px"
                height="288px"
              />
              {this.props.product.gallery.length > 1 && (
                <>
                  <button
                    onClick={this.prevImage}
                    className="container-btn-1"
                    style={{ width: "24px", height: "24px" }}
                  >
                    &lt;
                  </button>
                  <button
                    onClick={this.nextImage}
                    className="container-btn-2"
                    style={{ width: "24px", height: "24px" }}
                  >
                    &gt;
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <hr className="solid" />
      </>
    );
  }
}
