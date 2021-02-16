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

const ProductList = ({products, isGrid}) => {
  if (!products.products.length) return <Loading/>
  return (
    <>
      {isGrid ? <GridView products={products.products}/> : <ListView products={products.products}/>}
    </>)
}


const mapStateToProps = ({filter, products}) => {
  return {
    products,
    isGrid: filter.isGrid
  }
}


export default connect(mapStateToProps)(ProductList)
