import React, { useState } from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import AmountButtons from './AmountButtons'
import { FaTrash } from 'react-icons/fa'
import { connect } from 'react-redux'
import { REMOVE_CART_ITEM } from '../actions'
const CartItem = ({items, removeItem}) => {
  const [currentStock, setCurrentStock] = useState(1)
  const sendDataToParent = data => {
    setCurrentStock(data)
  }

  return (
    <>
    {items.map(item => {
      return (
      <Wrapper key={item.id}>
        <div className="title">
          <img src={item.image} alt={item.name}/>
          <div>
            <h5 className="name">{item.name}</h5>
            <p className="color">color: <span style={{backgroundColor: item.color}}></span></p>
            <h5 className="price-small">{item.price}</h5>
          </div>
        </div>
        <h5 className="price">{formatPrice(item.price)}</h5>
        <AmountButtons stock={item.stock} id={item.id} quantity={item.quantity} sendDataToParent={sendDataToParent}/>
        <h5 className="subtotal">{formatPrice(item.price * item.quantity)}</h5>
        <button onClick={() => removeItem(item.id)} className="remove-btn"><FaTrash/></button>
      </Wrapper>

      )
    })}
    </>
  )
}

const Wrapper = styled.article`
  .subtotal {
    display: none;
  }
  .price {
    display: none;
  }
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  .title {
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
  }

  .color {
    color: var(--clr-grey-5);
    font-size: 0.75rem;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: red;
      margin-left: 0.5rem;
      border-radius: var(--radius);
    }
  }
  .price-small {
    color: var(--clr-primary-5);
  }
  .amount-btns {
    width: 75px;
    button {
      width: 1rem;
      height: 0.5rem;
      font-size: 0.75rem;
    }
    h2 {
      font-size: 1rem;
    }
  }
  .remove-btn {
    color: var(--clr-white);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }
  @media (min-width: 776px) {
    .subtotal {
      display: block;
      margin-bottom: 0;
      color: var(--clr-grey-5);
      font-weight: 400;
      font-size: 1rem;
    }
    .price-small {
      display: none;
    }
    .price {
      display: block;
      font-size: 1rem;
      color: var(--clr-primary-5);
      font-weight: 400;
    }
    .name {
      font-size: 0.85rem;
    }
    .color {
      font-size: 0.85rem;
      span {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 75px;
    img {
      height: 100%;
    }
    .title {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
    .amount-btns {
      width: 100px;
      button {
        width: 1.5rem;
        height: 1rem;
        font-size: 1rem;
      }
      h2 {
        font-size: 1.5rem;
      }
    }
  }
`

const mapDispatch = dispatch => {
  return {removeItem: (id) => dispatch({type: REMOVE_CART_ITEM, payload: id})}
}

export default connect(null, mapDispatch)(CartItem)
