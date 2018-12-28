import 'whatwg-fetch'
import { ASC, DESC, PRICE, NAME } from '../constants'

export const RECEIVE_PRODUCTS = 'products/RECEIVE_PRODUCTS'
export const RECEIVE_VENDORS = 'products/RECEIVE_VENDORS'
export const RECEIVE_PRODUCT_TYPES = 'products/RECEIVE_PRODUCT_TYPES'
export const SET_PRICE_SORT_DIRECTION = 'products/SET_PRICE_SORT_DIRECTION'
export const SET_NAME_SORT_DIRECTION = 'products/SET_NAME_SORT_DIRECTION'
export const SET_NAME_FILTER = 'products/SET_NAME_FILTER'
export const SET_VENDOR_FILTER = 'products/SET_VENDOR_FILTER'
export const SET_PRODUCT_TYPE_FILTER = 'products/SET_PRODUCT_TYPE_FILTER'

export function getProducts() {
  return async (dispatch) => {
    const products = await fetch('http://localhost:8080/api/products')
      .then((response) => response.json())
      .then(productsJson => productsJson.data)
      .catch(err => console.log(err))

    dispatch(receiveProducts(products))
  }
}

export function getVendors() {
  return async (dispatch) => {
    const vendors = await fetch('http://localhost:8080/api/vendors')
      .then(response => response.json())
      .then(vendorsJson => vendorsJson.data)
      .catch(err => console.log(err))

    dispatch(receiveVendors(vendors))
  }
}

export function getProductTypes() {
  return async (dispatch) => {
    const productTypes = await fetch('http://localhost:8080/api/product-types')
      .then(response => response.json())
      .then(productTypes => productTypes.data)
      .catch(err => console.log(err))

    dispatch(receiveProductTypes(productTypes))
  }
}

export function receiveProducts(products) {
  return {
    type: RECEIVE_PRODUCTS,
    products
  }
}

export function setPriceSortDirection(priceSortDirection) {
  return {
    type: SET_PRICE_SORT_DIRECTION,
    priceSortDirection
  }
}

export function setNameSortDirection(nameSortDirection) {
  return {
    type: SET_NAME_SORT_DIRECTION,
    nameSortDirection
  }
}

export function setNameFilter(nameFilter) {
  return {
    type: SET_NAME_FILTER,
    nameFilter
  }
}

export function receiveVendors(vendors) {
  return {
    type: RECEIVE_VENDORS,
    vendors
  }
}

export function setVendorFilter(vendorFilter) {
  return {
    type: SET_VENDOR_FILTER,
    vendorFilter
  }
}

export function receiveProductTypes(productTypes) {
  return {
    type: RECEIVE_PRODUCT_TYPES,
    productTypes
  }
}

export function setProductTypeFilter(productTypeFilter) {
  return {
    type: SET_PRODUCT_TYPE_FILTER,
    productTypeFilter
  }
}

const initialState = {
  products: [],
  vendors: [],
  productTypes: [],
  priceSortDirection: DESC,
  nameSortDirection: DESC,
  activeSort: PRICE,
  nameFilter: '',
  vendorFilter: null,
  productTypeFilter: null
}

const ACTION_HANDLERS = {
  [RECEIVE_PRODUCTS]: (state, { products }) => Object.assign({}, state, {
    products
  }),
  [SET_PRICE_SORT_DIRECTION]: (state, { priceSortDirection }) =>
    Object.assign({}, state, {
      priceSortDirection,
      activeSort: PRICE
    }),
  [SET_NAME_SORT_DIRECTION]: (state, { nameSortDirection }) =>
    Object.assign({}, state, {
      nameSortDirection,
      activeSort: NAME
    }),
  [SET_NAME_FILTER]: (state, { nameFilter }) =>
    Object.assign({}, state, {
      nameFilter
    }),
  [RECEIVE_VENDORS]: (state, { vendors }) => Object.assign({}, state, {
    vendors
  }),
  [SET_VENDOR_FILTER]: (state, { vendorFilter }) => Object.assign({}, state, {
    vendorFilter
  }),
  [RECEIVE_PRODUCT_TYPES]: (state, { productTypes }) =>
    Object.assign({}, state, {
      productTypes
    }),
  [SET_PRODUCT_TYPE_FILTER]: (state, { productTypeFilter }) =>
    Object.assign({}, state, {
      productTypeFilter
    })
}

export default function products(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
