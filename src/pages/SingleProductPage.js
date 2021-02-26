import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import {
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

const SingleProductPage = ({getProductsDone, singleProduct, isLoading, getProductsStarted}) => {
  const {id} = useParams()
  useEffect(() => {
    getProductsStarted()
    axios.get(url+id).then(el => getProductsDone(el.data))
  }, [])
  console.log(singleProduct);
  if (!Object.keys(singleProduct).length){
    return <Loading/>
  }
  
  return (
    <Wrapper>
    <PageHero/>
    <div className="section section-center page">
      <Link className="btn" to="/products">back to products</Link>
      <div className="product-center">
        <ProductImages images={singleProduct.images}/>
        <section className="content">
          <h2>{singleProduct.name}</h2>
          <Stars stars={singleProduct.stars} reviews={singleProduct.reviews}/>
          <h5 className="price">{formatPrice(singleProduct.price)}</h5>
          <p className="desc">{singleProduct.description}</p>
          <p className="info"><span>Available: </span> {singleProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
          <p className="info"><span>SKU: </span> {singleProduct.id}</p>
          <p className="info"><span>Brand: </span> {singleProduct.company}</p>
          <AddToCart colors={singleProduct.colors} name={singleProduct.name} image={singleProduct.images[0].url} price={singleProduct.price} id={singleProduct.id} isLoading={isLoading} stock={singleProduct.stock}/>
        </section>
      </div>
    </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

const mapDispatchtToProps = dispatch => {
  return {
    getProductsStarted: ()=> dispatch({type: GET_SINGLE_PRODUCT_BEGIN}),
    getProductsDone: (products) => dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: products})
  }
}

const mapStateToProps = ({products}) => {
  return {
    singleProduct: products.singleProduct,
    isLoading: products.isLoading
  }
}

export default connect(mapStateToProps, mapDispatchtToProps)(SingleProductPage);
