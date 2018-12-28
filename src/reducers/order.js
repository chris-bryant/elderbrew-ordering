import findIndex from 'lodash/findIndex'
import find from 'lodash/find'
export const ADD_ITEM = 'order/ADD_ITEM'
export const REMOVE_ITEM = 'order/REMOVE_ITEM'
export const UPDATE_ITEM_QUANTITY = 'order/UPDATE_ITEM_QUANTITY'

export function addItem(item) {
  return {
    type: ADD_ITEM,
    item
  }
}

export function removeItem(id) {
  return {
    type: REMOVE_ITEM,
    id
  }
}

export function updateItemQuantity(id, quantity) {
  return {
    type: UPDATE_ITEM_QUANTITY,
    id,
    quantity
  }
}

const initialState = {
  items: []
}

const ACTION_HANDLERS = {
  [ADD_ITEM]: (state, { item }) => {
    const existingItem = find(state.items, { id: item.id })

    return existingItem
      ? state
      : Object.assign({},state, {
          items: [
            ...state.items,
            { ...item, quantity: 1 }
          ]
        })
  },
  [REMOVE_ITEM]: (state, { id }) => {
    const itemIndex = findIndex(state.items, { id })
    return Object.assign({}, state, {
      items: [
        ...state.items.slice(0, itemIndex),
        ...state.items.slice(itemIndex + 1)
      ]
    })
  },
  [UPDATE_ITEM_QUANTITY]: (state, { id, quantity }) => {
    const itemIndex = findIndex(state.items, { id })
    return Object.assign({}, state, {
      items: [
        ...state.items.slice(0, itemIndex),
        Object.assign({}, state.items[itemIndex], {
          quantity
        }),
        ...state.items.slice(itemIndex + 1)
      ]
    })
  }
}

export default function orderReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
