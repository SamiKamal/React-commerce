import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'
import { connect } from 'react-redux'
import { UPDATE_FILTERS, FILTER_PRODUCTS, CLEAR_FILTERS } from '../actions'
let categories,colors,companies

const Filters = ({filters, updateFilter, defaultProducts, doFilter, clearFilter}) => {
  const [searchQuery, setSearchQuery] = useState('')
  // get the maximum price in the products
  const maxPrice = Math.max.apply(Math, defaultProducts.map(function(o) { return o.price; }));
  const [priceRange, setPriceRange] = useState(maxPrice)
  const {category, company, color, price, shipping, filteredProducts} = filters
  // Get unquie values
  const firstColor = useRef(null)

  useEffect(()=> {
    categories = getUniqueValues(defaultProducts, 'category')
    colors = getUniqueValues(defaultProducts, 'colors')
    companies = getUniqueValues(defaultProducts, 'company')
    doFilter('none', 'all')
  }, [])
  
  const handleFilter = (e) => {
    // get the name and value and later check for the name and change the value based on that.
    let name = e.target.name;
    let value = e.target.value
    if (name === 'category'){
      value = e.target.textContent
      doFilter(name, value)
    }
    if (name === 'company'){
      doFilter(name, value)
    }

    if (name === 'color'){
      value = e.target.dataset.color;
      doFilter(name, value);
    }

    if (name === 'shipping'){
      value = e.target.checked;
      doFilter(name, value)
    }

    if (name === 'price'){
      setPriceRange(value)
      doFilter(name, value)
    }

    if (name === 'search'){
      setSearchQuery(value)
      doFilter(name, value)
    }
  }
  // for handling changing the style of colors when clicked 
  const handleClick = e => {
      e.target.closest('.colors').querySelectorAll('.active').forEach(el => {
      el.classList.remove('active')
      if (el.children.length) el.children[0].style.display = 'none'
      
    })
    e.target.closest('button').classList.add('active')
    if (e.target.closest('button').children.length)  e.target.closest('button').children[0].style.display = 'block'
  }

  // combine both handleClick and handleFilter for the colors
  const handleClickAndFilter = e => {
    handleClick(e)
    handleFilter(e)
  }

  // when page loads add class active to the first element of div.colors
  // might be deleted later.
  useEffect(() => {
    if (firstColor.current?.children?.length){
      firstColor.current.children[0].classList.add('active')
    }
  }, [firstColor])

  useEffect(() => {
    if (firstColor?.current?.children && filters.color === 'all'){
      Array.from(firstColor.current.children).forEach((el, i) => {
        if (i !== 0){
          el.children[0].style.display = 'none'
          if (el.classList.contains('active')) el.classList.remove('active')
        }
      })
    }
  }, [filters.color])

  useEffect(() => {
    if (filters.price === 'all'){
      setPriceRange(maxPrice)
    }
  }, [filters.price])
  return (
    <Wrapper>
      <div className="content">
        <form>
          <div className="form-control">
            <input type="text" placeholder="search" value={searchQuery} onChange={handleFilter} name="search" className="search-input"/>
          </div>
          <div className="form-control">
            <h5>category</h5>
            <div>
              {categories?.map((cate, i) => {
                if (cate === category){
                  return <button name="category" type="button" className="active" onClick={handleFilter}>{cate}</button>
                } else {
                  return <button name="category" type="button" className="null" onClick={handleFilter}>{cate}</button>
                }
              })}
            </div>
          </div>
          <div className="form-control">
            <h5>company</h5>
            <select name="company" value={company} className="company" onChange={handleFilter}>
            {companies?.map(comp =>  <option value={comp}>{comp}</option>)}
            </select>
          </div>
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors" ref={firstColor}>
              {colors?.map((color, i) =>  {
                if (i === 0) {
                  return <button name="color" data-color="all" className="all-btn active" className={filters.color === 'all' ? 'active' : ''} type="button" onClick={handleClickAndFilter}>all</button>
                } else {
                  return (<button onClick={handleClickAndFilter} name="color" data-color={color} style={{backgroundColor: color}} type="button" className="color-btn">
                              <FaCheck style={{display: 'none'}}/>
                          </button>)
                }
              })}
            </div>
          </div>
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(priceRange)}</p>
            <input type="range" name="price" min="0" onChange={handleFilter} max={maxPrice} value={priceRange}/>
          </div>
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input onChange={handleFilter} type="checkbox" checked={shipping} name="shipping" id="shipping"/>
          </div>
        </form>
        <button type="button" className="clear-btn" onClick={() => {setSearchQuery(""); return clearFilter();}}>clear filters</button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`
const mapDispatch = dispatch => {
  return {
    doFilter: (filterBy, filterByValue) => dispatch({type: FILTER_PRODUCTS, payload: {[filterBy]: filterByValue}}),
    updateFilter: () => dispatch({type: UPDATE_FILTERS}),
    clearFilter: () => dispatch({type: CLEAR_FILTERS})
    
  }
}

const mapState = ({filter, products}) => {
  return {
    filters: filter,
    defaultProducts: products.products
  }
}

export default connect(mapState, mapDispatch)(Filters);
