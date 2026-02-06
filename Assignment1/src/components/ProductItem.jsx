/*
Author: Kevin Thomas
Date: 2026-02-05
Last modifed: 2026-02-05
File: ProductItem.jsx
Description: Creates a boot strap card and inserts the product information into that card
*/

import React from 'react'

export default function ProductItem({ product, onDelete }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="card-header">{product.name}</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Price: ${product.price}</li>
            <li className="list-group-item">Stock: {product.stock}</li>
          </ul>
          <p className="card-text">{product.description}</p>
        <button className="btn btn-danger" onClick={() => onDelete(product.id)}>Delete</button>
      </div>
    </div>
  )
}
