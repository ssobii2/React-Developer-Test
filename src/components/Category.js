import React, { Component } from "react";
import { gql } from "@apollo/client";
import Cards from "./Cards";

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      category: "",
    };
  }

  getAllCategories = () => {
    this.props.client
      .query({
        query: gql`
          {
            category(input: { title: "all" }) {
              name
              products {
                id
                name
                inStock
                gallery
                description
                category
                attributes {
                  id
                  name
                  type
                  items {
                    displayValue
                    value
                    id
                  }
                }
                prices {
                  currency {
                    label
                    symbol
                  }
                  amount
                }
                brand
              }
            }
          }
        `,
      })
      .then((result) => {
        this.setState({
          products: result.data.category.products,
          category: result.data.category.name,
        });
      });
  };

  componentDidMount() {
    this.getAllCategories();
  }

  render() {
    return (
      <div className="category">
        <h2>{this.state.category.toUpperCase()}</h2>
        <div className="grid">
          {this.state.products.map((product) => {
            return (
              <Cards
                key={product.id}
                product={product}
                currentCurrency={this.props.currentCurrency}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
