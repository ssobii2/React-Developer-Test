import React, { Component } from "react";
import { Link } from "react-router-dom";
import Circle from '../images/circle.svg'

export default class Cards extends Component {
  render() {
    return (
      <div className="cards">
        <div className="container">
            <Link to={`/product/${this.props.product.id}`}><img className="main-img" src={this.props.product.gallery[0]} alt="product" width="354px" height="330px" /></Link>
            <img className="circle" src={Circle} alt="cart" />
        </div>
        <div className="card-p">
          <p>{this.props.product.name}</p>
          <p><b>{this.props.product.prices[0].currency.symbol}{this.props.product.prices[0].amount}</b></p>
        </div>
      </div>
    );
  }
}
