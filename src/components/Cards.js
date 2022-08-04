import React, { Component } from "react";
import { Link } from "react-router-dom";
import Circle from "../images/circle.svg";

export default class Cards extends Component {
  render() {
    const style = this.props.product.inStock ? "" : "in-stock";
    const style2 = this.props.product.inStock ? "" : "text-overlay";

    return (
      <div className="cards">
        <div className="container">
          {!this.props.product.inStock ? (
            <p className={style2}>OUT OF STOCK</p>
          ) : (
            ""
          )}
          <Link to={`/product/${this.props.product.id}`}>
            <img
              className={style}
              src={this.props.product.gallery[0]}
              alt="product"
              width="354px"
              height="330px"
            />
          </Link>
          <p id="text"></p>
          <img className="circle" src={Circle} alt="cart" />
        </div>
        <div className="card-p">
          <p>{this.props.product.name}</p>
          <p>
            {/* eslint-disable-next-line */}
            {this.props.product.prices.map((price) => {
              if (price.currency.symbol === this.props.currentCurrency) {
                return (
                  <b>
                    {price.currency.symbol}
                    {price.amount}
                  </b>
                );
              }
            }
            )}
          </p>
        </div>
      </div>
    );
  }
}
