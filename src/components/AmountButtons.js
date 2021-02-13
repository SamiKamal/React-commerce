import React, { useState } from 'react'
import styled from 'styled-components'
import { FaPlus, FaMinus } from 'react-icons/fa'

const AmountButtons = ({stock}) => {
  const [numItem, setNumItem] = useState(1)
  const increaseCart = e => {
    if (numItem < stock){
      setNumItem((prev)=> {
        return prev + 1
      })
    }
  }

  const decreaseCart = e => {
    if (numItem > 1){
      setNumItem((prev)=> {
        return prev - 1
      })
    }

  }

  return (
    <Wrapper className="amount-btns">
     <button className="amount-btn" onClick={decreaseCart}><FaMinus /></button>
      <h2 className="amount">{numItem}</h2>
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

export default AmountButtons
