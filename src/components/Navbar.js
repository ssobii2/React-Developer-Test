import React, { Component } from "react";
import Logo from "../images/a-logo.svg";
import Dollar from "../images/dollar-sign.svg";
import Cart from "../images/cart.svg";
import ProductImg from "../images/product.svg";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="nav-bar">
        <div className="nav-items">
          <a href="/">Women</a>
          <a href="/">Men</a>
          <a href="/">Kids</a>
        </div>
        <div className="logo">
          <img src={Logo} alt="logo" width="41px" height="41px" />
        </div>
        <div className="actions">
          <div className="dropdown">
            <img src={Dollar} alt="dollar" />
            <div className="dropdown-content">
              <a href="/">
                <img src={Dollar} alt="dollar" />
                USD
              </a>
              <a href="/">
                <img src={Dollar} alt="dollar" />
                EUR
              </a>
              <a href="/">
                <img src={Dollar} alt="dollar" />
                JPY
              </a>
            </div>
          </div>

          <div className="dropdown-2">
            <div id="overlay"></div>
            <img className="cart" src={Cart} alt="cart" />
            <div className="badge">3</div>
            <div className="dropdown-content-2">
              <p className="margin-p">
                <b>My Bag</b>,3 items
              </p>
              <div className="cart-product">
                <div className="info-width">
                  <h3>Apollo</h3>
                  <p>Running Short</p>
                  <h3 className="mb">$50.00</h3>
                  <h4 className="mb">SIZE:</h4>
                  <button className="size-btn sz-btn">XS</button>
                  <button className="size-btn sz-btn">S</button>
                  <button className="size-btn sz-btn">M</button>
                  <button className="size-btn sz-btn">L</button>
                  <h4 className="mb">COLOR:</h4>
                  <div className="boxes boxes-2">
                    <div className="gray"></div>
                    <div className="black"></div>
                    <div className="green"></div>
                  </div>
                </div>
                <div className="mp-btn">
                  <div className="m-p-btn">
                    <button style={{ width: "24px", height: "24px" }}>+</button>
                    <p>1</p>
                    <button style={{ width: "24px", height: "24px" }}>-</button>
                  </div>
                  <img
                    src={ProductImg}
                    alt="product"
                    width="221px"
                    height="190px"
                  />
                </div>
              </div>
              <div className="mini-cart">
                <b className="margin-r">Total</b>
                <b>$200.00</b>
                <div>
                  <a href="/cart">
                    <button className="bag-btn">View Bag</button>
                  </a>
                  <button
                    className="cart-btn"
                    style={{
                      width: "140px",
                      height: "43px",
                      marginRight: "25px",
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
