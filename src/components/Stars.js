import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({stars, reviews}) => {
  let arr = []
  let emptyStars = []
  let i;
  console.log(stars);
  for (i=0;i<Math.floor(stars);i++){
    arr.push(BsStarFill)
  }
  if (stars % 1 !== 0){
    arr.push(BsStarHalf)
  }
  console.log(arr.length);
  for (i=0; i< (5 - arr.length);i++){
    emptyStars.push(BsStar)
  }
  arr.push(...emptyStars)
  return (<Wrapper>
    <div className="stars">
      {arr.map(star => (
        <span>{star()}</span>
      ))}
    </div>
    <p className="reviews">
      ({reviews} customer reviews)
    </p>
  </Wrapper>)
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
