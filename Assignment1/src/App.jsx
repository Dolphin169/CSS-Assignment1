/*
Author: Kevin Thomas
Date: 2026-02-05
Last modifed: 2026-02-05
File: App.jsx
Description: Base for the page that handles the creation of products and deletion
along with initilzing the base layout
*/

import React, { useMemo, useState, useEffect } from 'react'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import { addProduct, getAllProducts, removeProduct } from './storage/productStorage'

export default function App(){
  // TODO: start with [] and consider hydrating from storage once storage helpers are implemented
  const [items, setItems] = useState([])
  
  //loads products on load
  useEffect(() => {
    setItems(getAllProducts());
  }, []);

  // Optional: toggle between views; start on 'list'
  const [view, setView] = useState('list') // 'list' | 'form'

  // TODO: compute total from items
  const total = useMemo(() => items.length, [items]);

  function handleCreate(data){
    // TODO: validate (in the form), persist to storage, then update state
    // Example flow (do not copy/paste): create id, add to storage, reload items
    // creats a const product that consists of data given and makes an id
    const product = {
      ...data,
      id: crypto.randomUUID()
    };
    // adds the product
    addProduct(product);
    // sets items to all products
    setItems(getAllProducts());
    // sets view to default list view
    setView('list')
    // logs the create product message
    console.log('Creating product', data)
  }

  function handleDelete(id){
    // TODO: remove from storage, then update state
    removeProduct(id);
    setItems(getAllProducts());
    setView('list');
    console.log('Deleting product', id)
  }

  return (
    <div className="container py-3">
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 m-0">My Web Shop</h1>
        <div className="btn-group">
          <button className={`btn btn-sm btn-${view==='list'?'primary':'outline-primary'}`} onClick={() => setView('list')}>
            Product List ({total})
          </button>
          <button className={`btn btn-sm btn-${view==='form'?'primary':'outline-primary'}`} onClick={() => setView('form')}>
            Add Product
          </button>
        </div>
      </header>
      {view === 'form' ? (
        <ProductForm onSubmit={handleCreate} />
      ) : (
        <ProductList items={items} onDelete={handleDelete} />
      )}
    </div>
  )
}
