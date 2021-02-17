import React from 'react'
import axios from 'axios'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  SET_GRIDVIEW,
  SET_LISTVIEW,
} from '../actions'
import { products_url as url } from '../utils/constants'
import { connect } from 'react-redux'
import Loading from './Loading'

const ProductList = ({originalProducts, filteredProducts, isGrid, isFiltering}) => {
  if (!originalProducts.length) return <Loading/>
  console.log(isFiltering);
  return (
    <>
      {isGrid ? <GridView products={isFiltering ? filteredProducts : originalProducts}/> : <ListView products={isFiltering ? filteredProducts : originalProducts}/>}
    </>)
}


const mapStateToProps = ({filter, products}) => {
  return {
    originalProducts: products.products,
    isGrid: filter.isGrid,
    filteredProducts: filter.filteredProducts,
    isFiltering: filter.isFiltering,
    filter
  }
}


export default connect(mapStateToProps)(ProductList)
