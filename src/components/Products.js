import React, { Component } from "react";
import ProductImg from "../images/product.svg";

export default class Products extends Component {
  render() {
    return (
      <div className="products">
        <div className="sm-images">
          <img src={ProductImg} alt="product" width="79px" height="80px" />
          <img src={ProductImg} alt="product" width="79px" height="80px" />
          <img src={ProductImg} alt="product" width="79px" height="80px" />
        </div>
        <div className="content">
          <img className="big-img" src={ProductImg} alt="product" width="450px" height="420px" />
          <div className="info">
            <h3>Apollo</h3>
            <p>Running Short</p>
            <h4 className="margin">SIZE:</h4>
            <button className="size-btn">XS</button>
            <button className="size-btn">S</button>
            <button className="size-btn">M</button>
            <button className="size-btn">L</button>
            <h4 className="margin">COLOR:</h4>
            <div className="boxes">
              <div className="gray"></div>
              <div className="black"></div>
              <div className="green"></div>
            </div>
            <h4 className="margin">PRICE:</h4>
            <h3>$50.00</h3>
            <button className="cart-btn">ADD TO CART</button>
            <p className="margin">Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.</p>
          </div>
        </div>
      </div>
    );
  }
}
