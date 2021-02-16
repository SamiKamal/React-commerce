import React from 'react'
import { useFilterContext } from '../context/filter_context'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  SET_GRIDVIEW,
  SET_LISTVIEW,
} from '../actions'

const Sort = ({setGridView, setListView, isGrid}) => {

  const changeListStyle = e => {
    document.querySelectorAll('.active').forEach(el => el.classList.remove('active'))
    e.target.closest('button').classList.add('active')
    if (e.target.closest('button').name === 'grid'){
      setGridView()
    } else {
      setListView()
    }

  }

  return (
    <Wrapper>
      <div className="btn-container">
        <button onClick={changeListStyle} name="grid" className="active">
          <BsFillGridFill/>
        </button>
        <button onClick={changeListStyle} name="list" className="null">
          <BsList/>
        </button>
      </div>
      <p>23 products found</p>
      <hr/>
      <form>
        <label htmlFor="sort">sort by</label>
        <select name="sort" id="sort" className="sort-input">
          <option value="price-lowest">price (lowest)</option>
          <option value="price-highest">price (highest)</option>
          <option value="name-a">name (a - z)</option>
          <option value="name-z">name (z - a)</option>
        </select>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`
const mapDispatchToProps = dispatch => {
  return {
    setGridView: () => dispatch({type: SET_GRIDVIEW}),
    setListView: ()  => dispatch({type: SET_LISTVIEW})
  }
}

const mapStateToProps = state => {
  return {
    isGrid: state.isGrid
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort)
