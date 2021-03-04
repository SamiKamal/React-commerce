import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'
import { connect } from 'react-redux'
import { ADD_TO_CART } from '../actions'

const AddToCart = ({colors, stock, isLoading, addItemToCart, name, price, id, image}) => {
  const [currentStock, setCurrecntStock] = useState(1)
  const [currentColor, setCurrentColor] = useState(null)
  const firstColor = useRef(null)
  const handleClick = e => {
    document.querySelectorAll('.active').forEach(el => {
      el.classList.remove('active')
      if (el.children.length) el.children[0].style.display = 'none'
      
    })
    e.target.closest('button').classList.add('active')
    e.target.closest('button').children[0].style.display = 'block'
    setCurrentColor(e.target.closest('button').dataset.color)
    
  }

  const sendDataToParent = data => {
    console.log(data);
    setCurrecntStock(data)
  }

  const handleAddToCart = e =>{
    addItemToCart({name, price, quantity: currentStock, color: currentColor, id, image, stock})
  }

  useEffect(() => {
    console.log(firstColor.current);
    if (firstColor.current?.children?.length){
      firstColor.current.children[0].classList.add('active')
      setCurrentColor(firstColor.current.children[0].dataset.color)
      firstColor.current.children[0].children[0].style.display = 'block'
    }
  }, [firstColor, isLoading])
  return (
    <Wrapper>
      {stock ? (
        <>
        <div className="colors">
          <span>colors: </span>
          <div ref={firstColor}>
            {colors.map((color, i) => (
              <button className="color-btn" data-color={color} onClick={handleClick} key={i} style={{backgroundColor: color}}>
                <FaCheck style={{display: 'none'}}/>
              </button>
            ))}
          </div>
        </div>
        <div className="btn-container">
          <AmountButtons stock={stock} sendDataToParent={sendDataToParent}/>
          <Link className="btn" onClick={handleAddToCart} to="/cart">add to cart</Link>
        </div>
      </>
      ) : (<hr/>)}
      
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
const mapDispatchTo = dispatch => {
  return {
    addItemToCart: (product) => dispatch({type: ADD_TO_CART, payload: product})
  }
}

export default connect(null, mapDispatchTo)(AddToCart)