import React, { useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Filters, ProductList, Sort, PageHero, Loading } from '../components'
import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
} from '../actions'
import { products_url as url } from '../utils/constants'

const ProductsPage = ({getProductsDone, getProductsStarted, isLoading}) => {
  useEffect(() => {
    getProductsStarted()
    axios.get(url).then(el => getProductsDone(el.data))
  }, [])
  // getProductsDone()
  if (isLoading){
    return <Loading/>
  }

  return (
    <main>
      <PageHero/>
      <Wrapper className="page">
        <div className="section-center products">
          <Filters/>
          <div>
            <Sort/>
            <ProductList/>
          </div>
        </div>
      </Wrapper>
    </main>

  )
}

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`
const mapDispatchtToProps = dispatch => {
  return {
    getProductsStarted: ()=> dispatch({type: GET_PRODUCTS_BEGIN}),
    getProductsDone: (products) => dispatch({type: GET_PRODUCTS_SUCCESS, payload: products})
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    products: state.products
  }
}

export default connect(mapStateToProps, mapDispatchtToProps)(ProductsPage)
