import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

export const products_reducer = (state = {}, action) => {
  const {type, payload} = action
  if (type === SIDEBAR_OPEN){
    return {...state, isSidebarOpen: true}
    
  } else if (type === SIDEBAR_CLOSE){
    return {...state, isSidebarOpen: false}
    
  } else if (type === GET_PRODUCTS_BEGIN){
    return {...state, isLoading: true, products: []}
    
  } else if (type === GET_PRODUCTS_SUCCESS){
    return {...state, isLoading: false, products: payload}
    
  } else if (type === GET_SINGLE_PRODUCT_BEGIN){
    return {...state, isLoading: true, singleProduct: {}}
    
  } else if (type === GET_SINGLE_PRODUCT_SUCCESS){
    return {...state, isLoading: false, singleProduct: payload}
  }
  return state
  // throw new Error(`No Matching "${action.type}" - action type`)
}
