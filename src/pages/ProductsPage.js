import React, { useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Filters, ProductList, Sort, PageHero } from '../components'
import {
  GET_PRODUCTS_SUCCESS,
} from '../actions'
import { products_url as url } from '../utils/constants'

const ProductsPage = ({getProductsDone}) => {
  useEffect(() => {
    axios.get(url).then(el => getProductsDone(el.data))
  })
  getProductsDone()
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
    getProductsDone: (products) => dispatch({type: GET_PRODUCTS_SUCCESS, payload: products})
  }
}

export default connect(null, mapDispatchtToProps)(ProductsPage)
