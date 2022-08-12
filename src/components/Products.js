import React, { Component } from "react";
import { gql } from "@apollo/client";

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      prices: [],
      gallery: [],
      attributes: [],
      currentImage: "",
    };
  }

  handleButtonClick = (id) => {
    if (this.props.activeSize.includes(id)) {
      this.props.activeSize.splice(this.props.activeSize.indexOf(id), 1);
    } else {
      this.props.setActiveSize(id);
    }
  };

  handleButtonClick_2 = (id) => {
    if (this.props.activeCapacity.includes(id)) {
      this.props.activeCapacity.splice(
        this.props.activeCapacity.indexOf(id),
        1
      );
    } else {
      this.props.setActiveCapacity(id);
    }
  };

  handleButtonClick_3 = (id) => {
    if (this.props.activeImac_1.includes(id)) {
      this.props.activeImac_1.splice(this.props.activeImac_1.indexOf(id), 1);
    } else {
      this.props.setActiveImac_1(id);
    }
  };

  handleButtonClick_4 = (id) => {
    if (this.props.activeImac_2.includes(id)) {
      this.props.activeImac_2.splice(this.props.activeImac_2.indexOf(id), 1);
    } else {
      this.props.setActiveImac_2(id);
    }
  };

  getProduct = (id) => {
    this.props.client
      .query({
        query: gql`
          {
            product(id: "${id}") {
              id
              name
              inStock
              gallery
              description
              category
              attributes {
                id
                name
                type
                items {
                  displayValue
                  value
                  id
                }
              }
              prices {
                currency {
                  label
                  symbol
                }
                amount
              }
              brand
            }
          }
        `,
      })
      .then((result) => {
        this.setState({
          product: result.data.product,
          prices: result.data.product.prices,
          gallery: result.data.product.gallery,
          currentImage: result.data.product.gallery[0],
          attributes: result.data.product.attributes,
        });
      });
  };

  handleImageChange = (image) => {
    this.setState({
      ...this.state,
      currentImage: image,
    });
  };

  componentDidMount() {
    let id = window.location.pathname.slice(9, window.location.pathname.length);
    this.getProduct(id);
  }

  render() {
    return (
      <div className="products">
        <div className="sm-images">
          {this.state.gallery.map((image, index) => {
            return (
              <img
                key={index}
                src={image}
                alt="product"
                width="79px"
                height="80px"
                onClick={() => this.handleImageChange(image)}
              />
            );
          })}
        </div>
        <div className="content">
          <img
            className="big-img"
            src={this.state.currentImage}
            alt="product"
            width="450px"
            height="420px"
          />
          <div className="info">
            <h3>{this.state.product.name}</h3>
            {/* eslint-disable-next-line */}
            {this.state.attributes.map((attribute, index) => {
              if (attribute.type === "text") {
                return (
                  <>
                    <h4 className="margin" key={index}>
                      {attribute.name}:
                    </h4>
                    {/* eslint-disable-next-line */}
                    {attribute.items.map((item, index) => {
                      if (attribute.id === "Size") {
                        return (
                          <button
                            onClick={() => this.handleButtonClick(item.id)}
                            className={
                              this.props.activeSize.includes(item.id)
                                ? "size-btn active"
                                : "size-btn"
                            }
                            key={index}
                          >
                            {item.value}
                          </button>
                        );
                      } else if (attribute.id === "Capacity") {
                        return (
                          <button
                            onClick={() => this.handleButtonClick_2(item.id)}
                            className={
                              this.props.activeCapacity.includes(item.id)
                                ? "size-btn active"
                                : "size-btn"
                            }
                            key={index}
                          >
                            {item.value}
                          </button>
                        );
                      } else if (attribute.id === "With USB 3 ports") {
                        return (
                          <button
                            onClick={() => this.handleButtonClick_3(item.id)}
                            className={
                              this.props.activeImac_1.includes(item.id)
                                ? "size-btn active"
                                : "size-btn"
                            }
                            key={index}
                          >
                            {item.value}
                          </button>
                        );
                      } else if (attribute.id === "Touch ID in keyboard") {
                        return (
                          <button
                            onClick={() => this.handleButtonClick_4(item.id)}
                            className={
                              this.props.activeImac_2.includes(item.id)
                                ? "size-btn active"
                                : "size-btn"
                            }
                            key={index}
                          >
                            {item.value}
                          </button>
                        );
                      }
                    })}
                  </>
                );
              }
            })}
            {/* eslint-disable-next-line */}
            {this.state.attributes.map((attribute, index) => {
              if (attribute.type === "swatch") {
                return (
                  <>
                    <h4 key={index} className="margin">
                      {attribute.name}:
                    </h4>
                    <div className="boxes">
                      {attribute.items.map((item, index) => {
                        return (
                          <div
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
            <h4 className="margin">PRICE:</h4>
            {/* eslint-disable-next-line */}
            {this.state.prices.map((price, index) => {
              if (price.currency.symbol === this.props.currentCurrency) {
                return (
                  <h3 key={index}>
                    {price.currency.symbol}
                    {price.amount}
                  </h3>
                );
              }
            })}

            {this.state.product.inStock &&
            (this.props.activeSize.length >= 1 ||
              this.props.activeCapacity.length >= 1) ? (
              <button
                className="cart-btn"
                onClick={() => this.props.handleAddToCart(this.state.product)}
              >
                ADD TO CART
              </button>
            ) : (
              <button disabled className="cart-btn disable">
                ADD TO CART
              </button>
            )}

            <p
              className="margin"
              dangerouslySetInnerHTML={{
                __html: this.state.product.description,
              }}
            ></p>
          </div>
        </div>
      </div>
    );
  }
}
