import React, { useEffect } from 'react'
import GridView from './GridView'
import ListView from './ListView'
import {
  UPDATE_SORT
} from '../actions'
import { products_url as url } from '../utils/constants'
import { connect } from 'react-redux'
import Loading from './Loading'

const ProductList = ({originalProducts, filteredProducts, isGrid, isFiltering, changeSort, sortArg}) => {
  useEffect(() => {
    changeSort(sortArg)
  }, [filteredProducts])

  if (!originalProducts.length) return <Loading/>
  if (!filteredProducts || !filteredProducts.length) return <h5>Sorry, no products matched your search</h5>
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
    sortArg: filter.sortArg,
    filter
  }
}

const mapDispatch = (dispatch) => {
  return {
    changeSort: (sortArg) => dispatch({type: UPDATE_SORT, payload: sortArg})
  }
}

export default connect(mapStateToProps, mapDispatch)(ProductList)
