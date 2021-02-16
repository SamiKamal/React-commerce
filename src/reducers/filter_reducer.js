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

  if (type === SET_LISTVIEW){
    return {...state, isGrid: false}
  } else if (type === SET_GRIDVIEW){
    return {...state, isGrid: true}
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}
