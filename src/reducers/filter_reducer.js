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
    return {...state, filteredProducts: payload}
  } else if (type === UPDATE_SORT){
    if (payload === 'price-lowest') return {...state, filteredProducts: state.filteredProducts.sort((a, b) => a.price - b.price), isFiltering: true}
    if (payload === 'price-highest') return {...state, filteredProducts: state.filteredProducts.sort((a, b) => b.price - a.price), isFiltering: true}

    if (payload === 'name-a'){
      const newProducts = state.filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      return {...state, filteredProducts: newProducts, isFiltering: true}
    } else {
      const newProducts = state.filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
      return {...state, filteredProducts: newProducts, isFiltering: true}

    }

  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}
