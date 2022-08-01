import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProductImg from '../images/product.svg'
import Circle from '../images/circle.svg'

export default class Cards extends Component {
  render() {
    return (
      <div className="cards">
        <div className="container">
            <Link to="/product"><img className="main-img" src={ProductImg} alt="product" width="354px" height="330px" /></Link>
            <img className="circle" src={Circle} alt="cart" />
        </div>
        <p>Apollo Running Short</p>
        <p>$50.00</p>
      </div>
    );
  }
}
