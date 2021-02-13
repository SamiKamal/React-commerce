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
} from '../actions'
import { products_url as url } from '../utils/constants'
import { connect } from 'react-redux'

const ProductList = ({state}) => {
  return (
    <>
      <GridView products={state.products}/>
      {/* <ListView products={state.products}/> */}
    </>
  )
}


const mapStateToProps = state => {
  return {
    state
  }
}
export default connect(mapStateToProps)(ProductList)
