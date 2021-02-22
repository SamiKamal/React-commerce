import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

export const filter_reducer = (state = {}, action) => {
  const {type, payload} = action;
  console.log(state);
  if (type === SET_LISTVIEW){
    return {...state, isGrid: false}
  } else if (type === SET_GRIDVIEW){
    return {...state, isGrid: true}
  } else if (type === LOAD_PRODUCTS) {
    return {...state, filteredProducts: payload, defaultProducts: payload}
  } else if (type === UPDATE_SORT){
    if (payload === 'price-lowest') return {...state, filteredProducts: state.filteredProducts.sort((a, b) => a.price - b.price), isFiltering: true, sortArg: 'price-lowest'}
    if (payload === 'price-highest') return {...state, filteredProducts: state.filteredProducts.sort((a, b) => b.price - a.price), isFiltering: true, sortArg: 'price-highest'}

    if (payload === 'name-a'){
      const newProducts = state.filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      return {...state, filteredProducts: newProducts, isFiltering: true, sortArg: 'name-a'}
    } else {
      const newProducts = state.filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
      return {...state, filteredProducts: newProducts, isFiltering: true, sortArg: 'name-z'}

    }

  } else if (type === UPDATE_FILTERS){
    return {...state, filteredProducts: state.defaultProducts, isFiltering: false}

  } else if (type === FILTER_PRODUCTS){
    // set all products
    let tempProducts = state.defaultProducts; 

    // check if there a property called 'company'
    if ('company' in payload){
      if (payload.company !== 'all') {
        // filter products by payload
        tempProducts = tempProducts.filter(el => el.company === payload.company)
      } 
      // if there is no property, check the state
      } else if(state.company !== 'all') {
        // filter by state
        tempProducts = tempProducts.filter(el => el.company === state.company)
      }

    if ('category' in payload){
      if (payload.category !== 'all') {
        tempProducts = tempProducts.filter(el => el.category === payload.category)
      }
    } else if(state.category !== 'all'){
      tempProducts = tempProducts.filter(el => el.category === state.category)

    }

    if ('color' in payload){
      if (payload.color !== 'all') {
        tempProducts = tempProducts.filter(el => el.colors.includes(payload.color))
      }
    } else if(state.color !== 'all'){
      tempProducts = tempProducts.filter(el => el.colors.includes(state.color))

    }

    if ('shipping' in payload){
      if (payload.shipping !== false) {
        tempProducts = tempProducts.filter(el => el.shipping === payload.shipping)
      }
    } else if(state.shipping !== false){
      tempProducts = tempProducts.filter(el => el.shipping === state.shipping)

    }

    if ('price' in payload){
      if (payload.price !== 'all') {
        tempProducts = tempProducts.filter(el => el.price <= payload.price)
      }
    } else if(state.price !== 'all'){
      tempProducts = tempProducts.filter(el => el.price <= state.price)

    }

    return {...state, filteredProducts: tempProducts, isFiltering: true, category: payload.category || state.category, company: payload.company || state.company, color: payload.color || state.color, shipping: (payload.shipping !== undefined ? payload.shipping : state.shipping), price: payload.price || state.price}

  } else if (type === CLEAR_FILTERS){
    return {...state, filteredProducts: state.defaultProducts, isFiltering: false, category: 'all', company: 'all', color: 'all',price: 'all', shipping: false }
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}
