import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

export const cart_reducer = (state = {}, action) => {
  const {type, payload} = action

  if (type === ADD_TO_CART){
    console.log(...state.itemsInCart);
    const isExist = state.itemsInCart.some(item => item.id === (payload.id + payload.color))
    if (isExist){
      const newitems = state.itemsInCart.map(item => {
        if (item.id === (payload.id + payload.color)){
          console.log(payload.quantity);
          item.quantity = item.quantity + payload.quantity
          item.quantity > payload.stock ? item.quantity = payload.stock : item.quantity = item.quantity
        }
        return item
      })
      return {...state, itemsInCart: newitems}
    }
    return {...state, itemsInCart: [...state.itemsInCart, {name: payload.name, stock: payload.stock, price: payload.price, quantity: payload.quantity, color: payload.color, id: payload.id + payload.color, image: payload.image}], total: state.total + 1}
  } else if (type === COUNT_CART_TOTALS){
    let totals = 0
    state.itemsInCart.forEach(item => {
      totals += item.price * item.quantity

    })
    return {...state, total: totals}
  } else if (type === REMOVE_CART_ITEM){
    const newItems = state.itemsInCart.filter(item => item.id !== payload)
    localStorage.setItem('items', JSON.stringify(newItems))
    return {...state, itemsInCart: newItems}
  } else if (type === TOGGLE_CART_ITEM_AMOUNT) {
    let newItems
    if (payload.type === 'inc') {
      newItems = state.itemsInCart.map(el => {
        if (el.id === payload.id){
          el.quantity++
        }
        return el
      })
    }
    if (payload.type === 'dec') {
      newItems = state.itemsInCart.map(el => {
        if (el.id === payload.id){
          el.quantity--
        }
        return el
      })
    }

    return {...state, itemsInCart: newItems}
  } else if (type === CLEAR_CART){
    localStorage.setItem('items', JSON.stringify([]))
    return {...state, itemsInCart: []}
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}