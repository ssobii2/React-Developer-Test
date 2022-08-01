import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Logo from "../images/a-logo.svg";
import Dollar from "../images/dollar-sign.svg";
import Cart from "../images/cart.svg";
import ProductImg from "../images/product.svg";

export default class Navbar extends Component {
  container = React.createRef();
  container_2 = React.createRef();

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
  }

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


  handleClickOutsideCart = (event) => {
    if (
      this.container_2.current &&
      !this.container_2.current.contains(event.target)
    ) {
      this.setState({
        cart: false,
      });
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("mousedown", this.handleClickOutsideCart);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("mousedown", this.handleClickOutsideCart);
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      cart: false,
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
            Women
          </NavLink>
          <NavLink
            to="/men"
            className={({ isActive }) => (isActive ? "link-active" : "a")}
          >
            Men
          </NavLink>
          <NavLink
            to="/kids"
            className={({ isActive }) => (isActive ? "link-active" : "a")}
          >
            Kids
          </NavLink>
        </div>
        <div className="logo">
          <img src={Logo} alt="logo" width="41px" height="41px" />
        </div>
        <div className="actions">
          <div className="dropdown" ref={this.container}>
            <div className="dropdown-button">
              <img src={Dollar} alt="dollar" onClick={this.handleClick} />
              {this.state.open ? (
                <FaAngleUp onClick={this.handleClick} />
              ) : (
                <FaAngleDown onClick={this.handleClick} />
              )}
            </div>
            {this.state.open && (
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
            )}
          </div>

          <div className="dropdown-2">
            <img
              className="cart"
              src={Cart}
              alt="cart"
              onClick={this.handleClickCart}
            />
            <div className="badge" ref={this.container_2}>3</div>
            {this.state.cart && (
              <>
                <div id="overlay"></div>
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
                        <button className="bag-btn">View Bag</button>
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
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
