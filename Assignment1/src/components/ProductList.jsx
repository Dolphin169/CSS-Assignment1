/*
Author: Kevin Thomas
Date: 2026-02-05
Last modifed: 2026-02-05
File: ProductList.jsx
Description: creates a list of all products that are in local storage
*/

import React from 'react'
import ProductItem from './ProductItem'

// TODO: if items is empty, show "No products available.
// TODO: otherwise, map items to <ProductItem />

export default function ProductList({ items, onDelete }) {
  return (
    <div>
      <h2 className="h5 mb-3">Products</h2>
      {items.length === 0 ? (
      <div className="alert alert-secondary">No products available.</div>) : 
      (<div>{items.map(item => (<ProductItem key={item.id} product={item} onDelete={onDelete} />))}
      </div>
      )}
    </div>
  )
}
