import React, { Component } from "react";

export default class Cart extends Component {

  plusButton = (id) => {
    const existingProduct = this.props.cart.find((item) => item.id === id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.prices.forEach((price, index) => {
        if (index === 0) {
          existingProduct.quantityPrice = existingProduct.quantityPrice + price.amount;
        }
      });
    }
    this.props.setCart(this.props.cart);
  }

  minusButton = (id) => {
    const existingProduct = this.props.cart.find((item) => item.id === id);
    if (existingProduct) {
      existingProduct.quantity = Math.max(0, existingProduct.quantity - 1);
      existingProduct.prices.forEach((price, index) => {
        if (index === 0) {
          existingProduct.quantityPrice = existingProduct.quantityPrice - price.amount;
        }
      });
      this.props.setCart(this.props.cart);
    }
    if (existingProduct.quantity === 0) {
      const remainingProducts = this.props.cart.filter((item) => item.id !== id);
      this.props.setCart(remainingProducts);
    }
  }

  componentDidMount() {
    this.props.cart.forEach((product) => {
      /* eslint-disable-next-line */
      product.prices.map((price, index) => {
        if (index === 0) {
          product.quantityPrice = price.amount;
        }
      });
    });
  }
  
  render() {
    let total = 0;
    this.props.cart.forEach((product) => {
      /* eslint-disable-next-line */
      product.prices.map((price) => {
        if (price.currency.symbol === this.props.currentCurrency) {
          total += product.quantityPrice;
        }
      });
    });
    let tax = total * 0.21;
    total = total + tax;

    return (
      <div className="cart">
        <h2>CART</h2>
        <hr className="solid" />
        <div className="cart-products">
          {this.props.cart.map((product, index) => (
            <>
              <div
                key={index}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="info-cart">
                  <h3>{product.name}</h3>
                  <h3 className="mb">
                    {/* eslint-disable-next-line */}
                    {product.prices.map((price, index) => {
                      if (
                        price.currency.symbol === this.props.currentCurrency
                      ) {
                        return (
                          <b key={index}>
                            {price.currency.symbol} {price.amount}
                          </b>
                        );
                      }
                    })}
                  </h3>
                  {/* eslint-disable-next-line */}
                  {product.attributes.map((attribute, index) => {
                    if (attribute.type === "text") {
                      return (
                        <>
                          <h4 className="mb" key={index}>
                            {attribute.name}:
                          </h4>
                          {attribute.items.map((item, index) => {
                            return (
                              <button key={index} className="size-btn">
                                {item.value}
                              </button>
                            );
                          })}
                        </>
                      );
                    }
                  })}
                  {/* eslint-disable-next-line */}
                  {product.attributes.map((attribute, index) => {
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
                    <button onClick={() => this.plusButton(product.id)}>+</button>
                    <p>{product.quantity}</p>
                    <button onClick={() => this.minusButton(product.id)}>-</button>
                  </div>
                  <div className="container">
                    {/* eslint-disable-next-line */}
                    {product.gallery.map((image, index) => {
                      if (index === 0) {
                        return (
                          <img
                            style={{ paddingLeft: "10px" }}
                            key={index}
                            src={image}
                            alt="product"
                            width="250px"
                            height="288px"
                          />
                        );
                      }
                    })}
                    {product.gallery.length > 1 && (
                      <>
                        <button
                          className="container-btn-1"
                          style={{ width: "24px", height: "24px" }}
                        >
                          &lt;
                        </button>
                        <button
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
          ))}
        </div>
        <div className="total">
          <p>
            Tax 21%:{" "}
            <b>
              {this.props.currentCurrency} {tax}
            </b>
          </p>
          <p>
            Quantity: <b>{this.props.cart.length}</b>
          </p>
          <p>
            Total:{" "}
            <b>
              {this.props.currentCurrency} {total}
            </b>
          </p>
          <button className="cart-btn">ORDER</button>
        </div>
      </div>
    );
  }
}
