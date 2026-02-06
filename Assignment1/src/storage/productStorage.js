/*
Author: Kevin Thomas
Date: 2026-02-05
Last modifed: 2026-02-05
File: ProductStorage.js
Description: creates the fucntions for getting all products,
creating products, and removing products from local storage
*/

// TODO: Implement localStorage-based persistence using JSON.parse / JSON.stringify.
// Use this key for storage:
export const STORAGE_KEY = 'a1_products';

// safely read json from storage
function read(key, storage){
    try{
        const raw = storage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

// safely write json to storage
function write(key, value, storage){
    storage.setItem(key, JSON.stringify(value));
}


// TODO: return an array of products from localStorage (or [] if none)
export function getAllProducts() {
  /* your code */
  // check the local storage with the key
  const data = read(STORAGE_KEY, localStorage);
  // return an array of the data read and if blank then return []
  return Array.isArray(data) ? data : [];
}

// TODO: persist a product into storage
export function addProduct(product) {
  // get array of products
  const products = getAllProducts();
  // add product to products
  products.push(product);
  // rewrite products
  write(STORAGE_KEY, products, localStorage);
}

// TODO: remove a product by id and persist
export function removeProduct(id) {
  // get array of products
  const products = getAllProducts();
  // update the array to not include the given id
  const updated = products.filter(p => p.id !== id);
  // write the updated array
  write(STORAGE_KEY, updated, localStorage)
  // basically copies the array then updates to avoid anomallies mentioned in class
}
