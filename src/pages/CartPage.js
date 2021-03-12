import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { CartContent, PageHero } from '../components'
import { connect } from 'react-redux'

const CartPage = ({itemsInCart}) => {

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(itemsInCart))
  }, [itemsInCart])
  
  if (!itemsInCart.length && !JSON.parse(localStorage.getItem("items"))?.length){
    return (
      <main>
        <Wrapper className="page-100">
          <div className="empty">
            <h2>Your cart is empty</h2>
            <Link to="/products" className="btn">Fill it</Link>
          </div>
        </Wrapper>
      </main>
    )
  }
  return (
    <main>
      <PageHero/>
      <Wrapper className="page">
        <CartContent/>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`

const mapState = ({cart}) => {
  return {itemsInCart: cart.itemsInCart}
}
export default connect(mapState)(CartPage)
