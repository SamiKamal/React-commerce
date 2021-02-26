import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

export const cart_reducer = (state = {}, action) => {
  const {type, payload} = action
  console.log(state);

  if (type === ADD_TO_CART){
    let newItems = [...state.items, {name: payload.name, price: payload.price, quantity: payload.quantity, color: payload.color, id: payload.id, image: payload.image}]
    console.log(...state.items);
    return {...state, items: newItems}
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}