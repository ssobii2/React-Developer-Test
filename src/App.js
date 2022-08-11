import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart";
import Category from "./components/Category";
import Clothes from "./components/Clothes";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Tech from "./components/Tech";

class App extends Component {
  plusButton = (id) => {
    const existingProduct = this.state.cart.find((item) => item.id === id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.prices.forEach((price, index) => {
        if (index === 0) {
          existingProduct.quantityPrice =
            existingProduct.quantityPrice + price.amount;
        }
      });
    }
    this.setState({ cart: this.state.cart });
  };

  minusButton = (id) => {
    const existingProduct = this.state.cart.find((item) => item.id === id);
    if (existingProduct) {
      existingProduct.quantity = Math.max(0, existingProduct.quantity - 1);
      existingProduct.prices.forEach((price, index) => {
        if (index === 0) {
          existingProduct.quantityPrice =
            existingProduct.quantityPrice - price.amount;
        }
      });
      this.setState({ cart: this.state.cart });
    }
    if (existingProduct.quantity === 0) {
      const remainingProducts = this.state.cart.filter(
        (item) => item.id !== id
      );
      this.setState({ cart: remainingProducts });
    }
  };

  handleCurrency = (currency) => {
    this.setState({
      currentCurrency: currency.symbol,
    });
  };

  handleAddToCart = (product) => {
    const existingProduct = this.state.cart.find(
      (item) => item.id === product.id
    );
    if (existingProduct) {
      existingProduct.quantity = 1;
    } else {
      this.state.cart.push({
        ...product,
        quantity: 1,
        quantityPrice: product.prices[0].amount,
      });
    }
    this.setState({ cart: this.state.cart });
  };

  setActive = (active) => {
    this.setState({ active });
  }

  constructor(props) {
    super(props);
    this.state = {
      currentCurrency: "$",
      cart: [],
      active: [],
    };
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Navbar
            handleCurrency={this.handleCurrency}
            currentCurrency={this.state.currentCurrency}
            client={this.props.client}
            cart={this.state.cart}
            minusButton={this.minusButton}
            plusButton={this.plusButton}
            active={this.state.active}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Category
                  currentCurrency={this.state.currentCurrency}
                  client={this.props.client}
                />
              }
            />
            <Route
              path="/product/:id"
              element={
                <Products
                  currentCurrency={this.state.currentCurrency}
                  client={this.props.client}
                  handleAddToCart={this.handleAddToCart}
                  active={this.state.active}
                  setActive={this.setActive}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={this.state.cart}
                  currentCurrency={this.state.currentCurrency}
                  minusButton={this.minusButton}
                  plusButton={this.plusButton}
                  active={this.state.active}
                />
              }
            />
            <Route path="/tech" element={<Tech client={this.props.client} />} />
            <Route
              path="/clothes"
              element={<Clothes client={this.props.client} />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
