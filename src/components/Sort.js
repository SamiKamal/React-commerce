import React from 'react'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT
} from '../actions'

const Sort = ({setGridView, setListView, changeSort, filter}) => {
  const changeListStyle = e => {
    e.target.closest('.btn-container').querySelectorAll('.active').forEach(el => el.classList.remove('active'))
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
        <button onClick={changeListStyle} name="grid" className={filter.isGrid ? 'active' : 'null'}>
          <BsFillGridFill/>
        </button>
        <button onClick={changeListStyle} name="list" className={filter.isGrid ? 'null' : 'active'}>
          <BsList/>
        </button>
      </div>
      <p>{filter.filteredProducts?.length} products found</p>
      <hr/>
      <form>
        <label htmlFor="sort">sort by</label>
        <select name="sort" onChange={(e) => changeSort(e.target.value)} id="sort" className="sort-input">
          <option value="name-z">name (z - a)</option>
          <option value="name-a">name (a - z)</option>
          <option value="price-lowest">price (lowest)</option>
          <option value="price-highest">price (highest)</option>
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
    setListView: ()  => dispatch({type: SET_LISTVIEW}),
    changeSort: (sortArg) => dispatch({type: UPDATE_SORT, payload: sortArg})
  }
}

const mapStateToProps = state => {
  return {
    filter: state.filter
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort)
