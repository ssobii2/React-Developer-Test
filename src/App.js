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

  setColor = (color) => {
    this.setState({ color: color });
  };

  setActiveSize_1 = (activeSize_1) => {
    this.setState({ activeSize_1: activeSize_1 });
  };

  setActiveSize_2 = (activeSize_2) => {
    this.setState({ activeSize_2: activeSize_2 });
  };

  setActiveCapacity_1 = (activeCapacity_1) => {
    this.setState({ activeCapacity_1: activeCapacity_1 });
  };

  setActiveCapacity_2 = (activeCapacity_2) => {
    this.setState({ activeCapacity_2: activeCapacity_2 });
  };

  setActiveImac_1 = (activeImac_1) => {
    this.setState({ activeImac_1: activeImac_1 });
  };

  setActiveImac_2 = (activeImac_2) => {
    this.setState({ activeImac_2: activeImac_2 });
  };

  constructor(props) {
    super(props);
    this.state = {
      currentCurrency: "$",
      cart: [],
      color: [],
      activeSize_1: [],
      activeSize_2: [],
      activeCapacity_1: [],
      activeCapacity_2: [],
      activeImac_1: [],
      activeImac_2: [],
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
            color={this.state.color}
            activeSize_1={this.state.activeSize_1}
            activeSize_2={this.state.activeSize_2}
            activeCapacity_1={this.state.activeCapacity_1}
            activeCapacity_2={this.state.activeCapacity_2}
            activeImac_1={this.state.activeImac_1}
            activeImac_2={this.state.activeImac_2}
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
                  color={this.state.color}
                  setColor={this.setColor}
                  activeSize_1={this.state.activeSize_1}
                  activeSize_2={this.state.activeSize_2}
                  activeCapacity_1={this.state.activeCapacity_1}
                  activeCapacity_2={this.state.activeCapacity_2}
                  activeImac_1={this.state.activeImac_1}
                  activeImac_2={this.state.activeImac_2}
                  setActiveSize_1={this.setActiveSize_1}
                  setActiveSize_2={this.setActiveSize_2}
                  setActiveCapacity_1={this.setActiveCapacity_1}
                  setActiveCapacity_2={this.setActiveCapacity_2}
                  setActiveImac_1={this.setActiveImac_1}
                  setActiveImac_2={this.setActiveImac_2}
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
                  color={this.state.color}
                  activeSize_1={this.state.activeSize_1}
                  activeSize_2={this.state.activeSize_2}
                  activeCapacity_1={this.state.activeCapacity_1}
                  activeCapacity_2={this.state.activeCapacity_2}
                  activeImac_1={this.state.activeImac_1}
                  activeImac_2={this.state.activeImac_2}
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
