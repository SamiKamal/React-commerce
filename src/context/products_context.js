//TODO: increase performance
//TODO: hanlde errors
import React, { useContext } from 'react'
import {products_reducer} from '../reducers/products_reducer'
import {cart_reducer} from '../reducers/cart_reducer'
import {filter_reducer} from '../reducers/filter_reducer'

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

const initialState = { products : {isSidebarOpen: false, products: [], singleProduct: {}, isLoading: false}, 
cart: {
  itemsInCart: JSON.parse(localStorage.getItem("items"))?.length ? JSON.parse(localStorage.getItem("items")) : [],
  total: 0
},
filter: {isGrid: true, isFiltering: false, filteredProducts: [], category: "all", company: 'all', color: 'all', price: 'all', shipping: false}
}
const rootReducers = combineReducers({products: products_reducer, cart: cart_reducer, filter: filter_reducer})
const ProductsContext = createStore(rootReducers, initialState)
export const ProductsProvider = ({ children }) => {
  return (
    <Provider store={ProductsContext}>
      {children}
    </Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
