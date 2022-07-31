import React, { Component } from 'react'
import Cards from './Cards'

export default class Category extends Component {
  render() {
    return (
      <div className="category">
        <h2>Category name</h2>
        <div className="grid">
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
        </div>
      </div>
    )
  }
}
