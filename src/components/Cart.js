import React, { Component } from "react";
import CartProducts from "./CartProducts";

export default class Cart extends Component {
  componentDidMount() {
    localStorage.getItem("cart") && this.props.setCart(JSON.parse(localStorage.getItem("cart")));
  }
  
  render() {
    let total = 0;
    this.props.cart.forEach((product) => {
      /* eslint-disable-next-line */
      product.quantityPrice.forEach((price) => {
        if (price.currencySymbol === this.props.currentCurrency) {
          total += price.price * product.quantity;
        }
      });
    });
    let tax = total * 0.21;
    
    return (
      <div className="cart">
        <h2>CART</h2>
        <hr className="solid" />
        <div className="cart-products">
          {this.props.cart.map((product, index) => (
            <CartProducts
              product={product}
              key={index}
              minusButton={this.props.minusButton}
              plusButton={this.props.plusButton}
              currentCurrency={this.props.currentCurrency}
            />
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
