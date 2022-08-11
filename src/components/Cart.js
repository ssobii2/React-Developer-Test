import React, { Component } from "react";
import CartProducts from "./CartProducts";

export default class Cart extends Component {
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
            <CartProducts product={product} key={index}/>
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
