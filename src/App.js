import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart";
import Category from "./components/Category";
import Navbar from "./components/Navbar";
import Products from "./components/Products";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Category />} />
            <Route path="/product" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
