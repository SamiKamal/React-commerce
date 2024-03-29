import React from 'react'
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { useAuth0 } from "@auth0/auth0-react";

const CartButtons = ({itemsInCart}) => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  let numberOfItems = 0
  itemsInCart.forEach(item => {
    numberOfItems += item.quantity
  })
  return (
    <Wrapper className="cart-btn-wrapper">
      <Link className="cart-btn" to="/cart">
        Cart
        <div className="cart-container">
          <FaShoppingCart/>
          {itemsInCart.length ? <span className="cart-value">{numberOfItems}</span> : ''}
        </div>
      </Link>
      {isAuthenticated ? (
      <button className="auth-btn" onClick={logout}>
        logout
        <FaUserMinus/>
      </button>
) 
: 
(
      <button className="auth-btn" onClick={loginWithRedirect}>
        Login
        <FaUserPlus/>
      </button>
)}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`
const mapState = ({cart}) => {
  return {
    itemsInCart: cart.itemsInCart
  }
}

export default connect(mapState)(CartButtons)
