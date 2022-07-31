import React, { Component } from "react";
import ProductImg from "../images/product.svg";

export default class Cart extends Component {
  render() {
    return (
      <div className="cart">
        <h2>CART</h2>
        <hr className="solid" />
        <div className="cart-products">
          <div className="info">
            <h3>Apollo</h3>
            <p>Running Short</p>
            <h3 className="mb">$50.00</h3>
            <h4 className="mb">SIZE:</h4>
            <button className="size-btn">XS</button>
            <button className="size-btn">S</button>
            <button className="size-btn">M</button>
            <button className="size-btn">L</button>
            <h4 className="mb">COLOR:</h4>
            <div className="boxes">
              <div className="gray"></div>
              <div className="black"></div>
              <div className="green"></div>
            </div>
          </div>
          <div className="minus-plus-btn">
            <div className="m-p-btn">
              <button>+</button>
              <p>1</p>
              <button>-</button>
            </div>
            <div className="container">
                <img src={ProductImg} alt="product" width="300px" height="220px" />
                <button className="container-btn-1" style={{width: "24px", height: "24px"}}>&lt;</button>
                <button className="container-btn-2" style={{width: "24px", height: "24px"}}>&gt;</button>
            </div>
          </div>
        </div>
        <hr className="solid" />
        <div className="total">
            <p>Tax 21%: <b>$42.00</b></p>
            <p>Quantity: <b>3</b></p>
            <p>Total: <b>$200.00</b></p>
            <button className="cart-btn">ORDER</button>
        </div>
      </div>
    );
  }
}
