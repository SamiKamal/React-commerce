import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { CartContent, PageHero } from '../components'
import { connect } from 'react-redux'

const CartPage = () => {
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

const mapState = state => {
  return {state}
}
export default connect(mapState)(CartPage)
