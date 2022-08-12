import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { gql } from "@apollo/client";
import Logo from "../images/a-logo.svg";
import Cart from "../images/cart.svg";

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
        open_2: !state.open_2,
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
      open_2: false,
      currencies: [],
    };
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
            {this.state.open && (
              <div className="dropdown-content">
                {this.state.currencies.map((currency, index) => {
                  return (
                    <p
                      key={index}
                      onClick={() => this.props.handleCurrency(currency)}
                    >
                      {currency.symbol} {currency.label}
                    </p>
                  );
                })}
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
            <div className="badge">{this.props.cart.length}</div>
            {this.state.open_2 && (
              <div ref={this.container_2}>
                <div id="overlay" onClick={this.handleClickOutsideCart}></div>
                <div className="dropdown-content-2">
                  <p className="margin-p">
                    <b>My Bag</b>, {this.props.cart.length} items
                  </p>
                  {/* eslint-disable-next-line */}
                  {this.props.cart.map((product, index) => (
                    <>
                      <div className="cart-product">
                        <div className="info-width" key={index}>
                          <p>{product.name}</p>
                          <h3 className="mb">
                            {/* eslint-disable-next-line */}
                            {product.prices.map((price, index) => {
                              if (
                                price.currency.symbol ===
                                this.props.currentCurrency
                              ) {
                                return (
                                  <b key={index}>
                                    {price.currency.symbol} {price.amount}
                                  </b>
                                );
                              }
                            })}
                          </h3>
                          {/* eslint-disable-next-line */}
                          {product.attributes.map((attribute, index) => {
                            if (attribute.type === "text") {
                              return (
                                <>
                                  <p className="mb" key={index}>
                                    {attribute.name}:
                                  </p>
                                  {/* eslint-disable-next-line */}
                                  {attribute.items.map((item, index) => {
                                    if (attribute.id === "Size") {
                                      if (
                                        item.value === "S" ||
                                        "M" ||
                                        "L" ||
                                        "XL"
                                      ) {
                                        return (
                                          <button
                                            className={
                                              this.props.activeSize_1.includes(
                                                item.id
                                              )
                                                ? "sz-btn active"
                                                : "sz-btn"
                                            }
                                            key={index}
                                          >
                                            {item.value}
                                          </button>
                                        );
                                      } else if (
                                        item.value === "40" ||
                                        "41" ||
                                        "42" ||
                                        "43"
                                      ) {
                                        return (
                                          <button
                                            className={
                                              this.props.activeSize_2.includes(
                                                item.id
                                              )
                                                ? "sz-btn active"
                                                : "sz-btn"
                                            }
                                            key={index}
                                          >
                                            {item.value}
                                          </button>
                                        );
                                      }
                                    } else if (attribute.id === "Capacity") {
                                      if (item.value === "512G" || "1T") {
                                        return (
                                          <button
                                            className={
                                              this.props.activeCapacity_1.includes(
                                                item.id
                                              )
                                                ? "sz-btn active"
                                                : "sz-btn"
                                            }
                                            key={index}
                                          >
                                            {item.value}
                                          </button>
                                        );
                                      } else if (
                                        item.value === "256GB" ||
                                        "512GB"
                                      ) {
                                        return (
                                          <button
                                            className={
                                              this.props.activeCapacity_2.includes(
                                                item.id
                                              )
                                                ? "sz-btn active"
                                                : "sz-btn"
                                            }
                                            key={index}
                                          >
                                            {item.value}
                                          </button>
                                        );
                                      }
                                    } else if (
                                      attribute.id === "With USB 3 ports"
                                    ) {
                                      return (
                                        <button
                                          className={
                                            this.props.activeImac_1.includes(
                                              item.id
                                            )
                                              ? "sz-btn active"
                                              : "sz-btn"
                                          }
                                          key={index}
                                        >
                                          {item.value}
                                        </button>
                                      );
                                    } else if (
                                      attribute.id === "Touch ID in keyboard"
                                    ) {
                                      return (
                                        <button
                                          className={
                                            this.props.activeImac_2.includes(
                                              item.id
                                            )
                                              ? "sz-btn active"
                                              : "sz-btn"
                                          }
                                          key={index}
                                        >
                                          {item.value}
                                        </button>
                                      );
                                    }
                                  })}
                                </>
                              );
                            }
                          })}
                          {/* eslint-disable-next-line */}
                          {product.attributes.map((attribute, index) => {
                            if (attribute.type === "swatch") {
                              return (
                                <>
                                  <p className="mb" key={index}>
                                    {attribute.name}:
                                  </p>
                                  <div className="boxes boxes-2">
                                    {attribute.items.map((item, index) => {
                                      return (
                                        <div
                                          className={
                                            this.props.color.includes(item.id)
                                              ? "boxes-div active-color"
                                              : "boxes-div"
                                          }
                                          key={index}
                                          style={{
                                            backgroundColor: item.value,
                                          }}
                                        ></div>
                                      );
                                    })}
                                  </div>
                                </>
                              );
                            }
                          })}
                        </div>
                        <div className="mp-btn">
                          <div className="m-p-btn">
                            <button
                              onClick={() => this.props.plusButton(product.id)}
                              style={{ width: "24px", height: "24px" }}
                            >
                              +
                            </button>
                            <p>{product.quantity}</p>
                            <button
                              onClick={() => this.props.minusButton(product.id)}
                              style={{ width: "24px", height: "24px" }}
                            >
                              -
                            </button>
                          </div>
                          {/* eslint-disable-next-line */}
                          {product.gallery.map((image, index) => {
                            if (index === 0) {
                              return (
                                <img
                                  style={{ paddingLeft: "10px" }}
                                  key={index}
                                  src={image}
                                  alt="product"
                                  width="151px"
                                  height="190px"
                                />
                              );
                            }
                          })}
                        </div>
                      </div>
                    </>
                  ))}
                  <div className="mini-cart">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                      }}
                    >
                      <div>
                        <b>Total</b>
                      </div>
                      <div>
                        <b>
                          {this.props.currentCurrency} {total}
                        </b>
                      </div>
                    </div>
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
