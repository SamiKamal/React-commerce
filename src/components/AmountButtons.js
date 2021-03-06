import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { connect } from 'react-redux'
import { TOGGLE_CART_ITEM_AMOUNT } from '../actions'

const AmountButtons = ({stock, sendDataToParent, quantity, dispatch, id}) => {
  const [numItem, setNumItem] = useState(1)
  const increaseCart = e => {
    if (!quantity){
      if (numItem < stock){
        setNumItem((prev)=> {
          return prev + 1
        })
      }
    } else if (quantity < stock){
      dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload: {type: 'inc', id: id}})
    }
  }
  const decreaseCart = e => {
    if (!quantity){
      if (numItem > 1){
        setNumItem((prev)=> {
          return prev - 1
        })
      }
    } else if (quantity > 1){
      
      dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload: {type: 'dec', id: id}})
      
    }
  }
  useEffect(()=> {
    if (sendDataToParent){
      sendDataToParent(numItem)
    }
  }, [numItem])

  return (
    <Wrapper className="amount-btns">
     <button className="amount-btn" onClick={decreaseCart}><FaMinus /></button>
      <h2 className="amount">{quantity ? quantity : numItem}</h2>
      <button className="amount-btn" onClick={increaseCart}><FaPlus /></button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`

export default connect()(AmountButtons)
