import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'
import { createStore } from 'redux';
import { Provider } from 'react-redux';


const initialState = {}

const FilterContext = createStore(reducer, initialState)

export const FilterProvider = ({ children }) => {
  return (
    <Provider store={FilterContext}>
      {children}
    </Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
