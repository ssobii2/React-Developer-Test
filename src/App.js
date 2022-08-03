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
  render() {
    return (
      <Router>
        <div className="app">
          <Navbar client={this.props.client}/>
          <Routes>
            <Route path="/" element={<Category client={this.props.client}/>} />
            <Route path="/product/:id" element={<Products client={this.props.client}/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/tech" element={<Tech client={this.props.client}/>} />
            <Route path="/clothes" element={<Clothes client={this.props.client}/>} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
