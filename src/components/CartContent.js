import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import CartColumns from './CartColumns'
import CartItem from './CartItem'
import CartTotals from './CartTotals'
import { connect } from 'react-redux'
import { CLEAR_CART, COUNT_CART_TOTALS } from '../actions'

const CartContent = ({items, total, dispatch}) => {
  
  useEffect(() => {
    dispatch({type: COUNT_CART_TOTALS})
  }, [items, dispatch])

  return (
    <Wrapper className="section section-center">
      <CartColumns/>
      {items.length ? <CartItem items={items}/> : (JSON.parse(localStorage.getItem("items")).length && <CartItem items={JSON.parse(localStorage.getItem("items"))}/>)}
      <hr/>
      <div className="link-container">
        <Link to="/products" className="link-btn">continue shopping</Link>
        <button type="button" onClick={() => dispatch({type: CLEAR_CART})} className="link-btn clear-btn">clear shopping cart</button>
      </div>
      <CartTotals total={total}/>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`

const mapState = ({cart}) => {
  return {
    items: cart.itemsInCart,
    total: cart.total
  }
}

export default connect(mapState)(CartContent)
