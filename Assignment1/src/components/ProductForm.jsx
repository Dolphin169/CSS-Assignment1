/*
Author: Kevin Thomas
Date: 2026-02-05
Last modifed: 2026-02-05
File: ProductForm.jsx
Description: file to allow users to add a product to the product list utilizing local storage
has full validation
*/

import React, { useState } from 'react';

// TODO: Create a validate() that sets an errors object and returns boolean:
// - All fields required
// - price: number with up to 2 decimals, >= 0
// - stock: non-negative integer

export default function ProductForm({ onSubmit }){
  // constants
  const [model, setModel] = useState({ name: "", price: "", stock: "", description: ""});
  const [errors, setErrors] = useState({});

  // function to handle change on the page
  function handleChange(e) {
        const {name, value} = e.target;
        setModel(f => ({
          ...f,
          [name]: value
      }));
  }
  /*
  Author: Kevin Thomas
  Date: 2025-02-04
  Description: validate fuction to validate values given on add product "page"
  */
  function validate(){
    // constants and variables
    const next = {};
    var errorsFound = false;
    const priceNumber = Number(model.price);
    const stockNumber = Number(model.stock);

    // checks if model name exists
    if (model.name.length <= 0){
          next.name = "Name must exist";
          // sets the errors to the error array
          setErrors(next);
          // sets the bool to true because an error was found
          errorsFound = true;
        }
    
    // checks if model price exists
    if (model.price.length <= 0){
          next.price = "Price must exist";
          setErrors(next);
          errorsFound = true;
        }
    // Checks if price is a number using the priceNumber const
    else if (Number.isNaN(priceNumber)){
          next.price = "Price must be a number";
          setErrors(next);
          errorsFound = true;
    }
    // Checks if price isnt negative and that price is a decimal to 2 places
    else if (priceNumber < 0 || !Number.isInteger(priceNumber * 100)){
          next.price = "Price must be positive and only have a max of 2 decimal spaces";
          setErrors(next);
          errorsFound = true;
    }

    // checks if model stock exists
    if (model.stock.length <= 0){
          next.stock = "Stock must exist";
          setErrors(next);
          errorsFound = true;
        }
    // checks if stock is a number, greater than 0, and not a decimal
    else if (Number.isNaN(stockNumber) || stockNumber < 0 || !Number.isInteger(stockNumber)){
          next.stock = "Stock must be positive number or 0 and cant be a decimal";
          setErrors(next);
          errorsFound = true;
    }

    // checks if model description exists
    if (model.description.length <= 0){
          next.description = "Description must exist";
          setErrors(next);
          errorsFound = true;
        }

    // checks if any errors are found
    if (errorsFound === true){
        setErrors(next);
        return false;
    }
    // if no errors
    else{
        setErrors({});
        return true;
    }
  }

  // submits data if validation passes if not it ends, values passed create an product
  function handleSubmit(e){
    e.preventDefault()
    console.log('Submitting:', model)
    if (!validate()) return;
    onSubmit({ name: model.name, price: Number(model.price), stock: Number(model.stock), description: model.description})
  }

  return (
    <form className="row g-3" onSubmit={handleSubmit} noValidate>
      <div className="col-md-6">
        <label className="form-label">Product Name</label>
        <input name="name" error={errors.name} value={model.name} onChange={handleChange} className={`form-control ${errors.name ? 'is-invalid' : ''}`}/>
        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
      </div>

      <div className="col-md-3">
        <label className="form-label">Price</label>
        <input name="price" value={model.price} onChange={handleChange} className={`form-control ${errors.price ? 'is-invalid' : ''}`}/>
        {errors.price && (<div className="invalid-feedback">{errors.price}</div>)}
        <div className="form-text">Format: 12.34</div>
      </div>

      <div className="col-md-3">
        <label className="form-label">Stock</label>
        <input name="stock" value={model.stock} onChange={handleChange} className={`form-control ${errors.stock ? 'is-invalid' : ''}`}/>
        {errors.stock && (<div className="invalid-feedback">{errors.stock}</div>)}
      </div>

      <div className="col-12">
        <label className="form-label">Description</label>
        <textarea name="description" value={model.description} onChange={handleChange} className={`form-control ${errors.description ? 'is-invalid' : ''}`}/>
        {errors.description && (<div className="invalid-feedback">{errors.description}</div>)}
      </div>

      <div className="col-12 d-flex gap-2">
        <button className="btn btn-primary" type="submit">Save Product</button>
      </div>
    </form>
  )
}
