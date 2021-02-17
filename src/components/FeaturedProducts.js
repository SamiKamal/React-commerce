import React, { useEffect } from 'react'
import { useProductsContext } from '../context/products_context'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Error from './Error'
import Loading from './Loading'
import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
} from '../actions'
import { products_url as url } from '../utils/constants'
import Product from './Product'
import { connect } from 'react-redux'
import axios from 'axios'

const FeaturedProducts = ({getProductsStarted, getProductsDone, products}) => {
  useEffect(() => {
    getProductsStarted()
    axios.get(url).then(data => getProductsDone(data.data))
  }, [])
  
  if (products.isLoading || !products.products){
    return (
      <Wrapper className="section">
        <div className="title">
          <h2>featured products</h2>
          <div className="underline"></div>
        </div>

        <div className="section-center featured">
          <Loading/>
        </div>
      </Wrapper>
    )
  }
  return (
    <Wrapper className="section">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline"></div>
      </div>
      
      <div className="section-center featured">
        {products.products.filter(prod => {
          return prod.featured
        }).slice(0,3).map(prod => <Product Product={prod} key={prod.id}/>)}
      </div>

      <Link to="/products" className="btn">all products</Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

const mapDispatchToProps = dispatch => {
  return{
    getProductsStarted: ()=> dispatch({type: GET_PRODUCTS_BEGIN}),
    getProductsDone: (products) => dispatch({type: GET_PRODUCTS_SUCCESS, payload: products})
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {products: state.products}
}
export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProducts)
