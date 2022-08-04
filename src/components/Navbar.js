import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { gql } from "@apollo/client";
import Logo from "../images/a-logo.svg";
import Cart from "../images/cart.svg";
import ProductImg from "../images/product.svg";

export default class Navbar extends Component {
  container = React.createRef();
  container_2 = React.createRef();

  getCurrencies = () => {
    this.props.client
      .query({
        query: gql`
          {
            currencies {
              label
              symbol
            }
          }
        `,
      })
      .then((result) => {
        this.setState({
          currencies: result.data.currencies,
        });
      });
  };

  handleClick = () => {
    this.setState((state) => {
      return {
        open: !state.open,
      };
    });
  };

  handleClickCart = () => {
    this.setState((state) => {
      return {
        cart: !state.cart,
      };
    });
  };

  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false,
      });
    }
  };

  handleClickOutsideCart = () => {
    this.container_2.current.style.display = "none";
  };

  // handleCurrency = (currency) => {
  //   this.setState({
  //     currentCurrency: currency.symbol,
  //   });
  // }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.getCurrencies();
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      cart: false,
      currencies: [],
      // currentCurrency: "",
    };
  }

  render() {
    return (
      <nav className="nav-bar">
        <div className="nav-items">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "link-active" : "a")}
          >
            All
          </NavLink>
          <NavLink
            to="/tech"
            className={({ isActive }) => (isActive ? "link-active" : "a")}
          >
            Tech
          </NavLink>
          <NavLink
            to="/clothes"
            className={({ isActive }) => (isActive ? "link-active" : "a")}
          >
            Clothes
          </NavLink>
        </div>
        <div className="logo">
          <img src={Logo} alt="logo" width="41px" height="41px" />
        </div>
        <div className="actions">
          <div className="dropdown" ref={this.container}>
            <div className="dropdown-button">
              <p onClick={this.handleClick}>{this.props.currentCurrency}</p>
              {this.state.open ? (
                <FaAngleUp onClick={this.handleClick} />
              ) : (
                <FaAngleDown onClick={this.handleClick} />
              )}
            </div>
            {this.state.open &&
            (
              <div className="dropdown-content">
                {
                  this.state.currencies.map((currency, index) => {
                    return (
                        <p key={index} onClick={() => this.props.handleCurrency(currency)}>
                          {currency.symbol} {currency.label}
                        </p>
                    );
                  })
                }
              </div>
            )
            }
          </div>

          <div className="dropdown-2">
            <img
              className="cart"
              src={Cart}
              alt="cart"
              onClick={this.handleClickCart}
            />
            <div className="badge">3</div>
            {this.state.cart && (
              <div ref={this.container_2}>
                <div id="overlay" onClick={this.handleClickOutsideCart}></div>
                <div className="dropdown-content-2">
                  <p className="margin-p">
                    <b>My Bag</b>,3 items
                  </p>
                  <div className="cart-product">
                    <div className="info-width">
                      <p>Apollo</p>
                      <p>Running Short</p>
                      <h3 className="mb">$50.00</h3>
                      <p className="mb">Size:</p>
                      <button className="size-btn sz-btn">XS</button>
                      <button className="size-btn sz-btn">S</button>
                      <button className="size-btn sz-btn">M</button>
                      <button className="size-btn sz-btn">L</button>
                      <p className="mb">Color:</p>
                      <div className="boxes boxes-2">
                        <div className="gray"></div>
                        <div className="black"></div>
                        <div className="green"></div>
                      </div>
                    </div>
                    <div className="mp-btn">
                      <div className="m-p-btn">
                        <button style={{ width: "24px", height: "24px" }}>
                          +
                        </button>
                        <p>1</p>
                        <button style={{ width: "24px", height: "24px" }}>
                          -
                        </button>
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
                      <Link to="/cart">
                        <button
                          className="bag-btn"
                          onClick={this.handleClickOutsideCart}
                        >
                          View Bag
                        </button>
                      </Link>
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
            )}
          </div>
        </div>
      </nav>
    );
  }
}
