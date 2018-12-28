import { combineReducers } from 'redux'
import products from './reducers/products'
import order from './reducers/order'

const USER_LOGOUT = 'app/USER_LOGOUT'
export function logoutUser() {
  return { type: USER_LOGOUT }
}

export default function createReducer(injectedReducers) {
  const appReducer = combineReducers({
    products,
    order
  })

  return (state, action) => {
    if (action.type === USER_LOGOUT) {
      state = undefined
    }

    return appReducer(state, action)
  }
}
