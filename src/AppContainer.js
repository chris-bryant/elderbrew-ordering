import { connect } from 'react-redux'
import {
  getProducts,
  setPriceSortDirection,
  setNameSortDirection,
  setNameFilter,
  getVendors,
  setVendorFilter,
  getProductTypes,
  setProductTypeFilter
} from './reducers/products'
import { addItem } from './reducers/order'
import App from './App'

const mapStateToProps = state => ({
  products: state.products.products,
  priceSortDirection: state.products.priceSortDirection,
  nameSortDirection: state.products.nameSortDirection,
  activeSort: state.products.activeSort,
  nameFilter: state.products.nameFilter,
  vendors: state.products.vendors,
  vendorFilter: state.products.vendorFilter,
  productTypes: state.products.productTypes,
  productTypeFilter: state.products.productTypeFilter
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts()),
  setPriceSortDirection: (priceSortDirection) =>
    dispatch(setPriceSortDirection(priceSortDirection)),
  setNameSortDirection: (nameSortDirection) =>
    dispatch(setNameSortDirection(nameSortDirection)),
  setNameFilter: (nameFilter) => dispatch(setNameFilter(nameFilter)),
  getVendors: () => dispatch(getVendors()),
  setVendorFilter: (vendorFilter) => dispatch(setVendorFilter(vendorFilter)),
  getProductTypes: () => dispatch(getProductTypes()),
  setProductTypeFilter: (productTypeFilter) =>
    dispatch(setProductTypeFilter(productTypeFilter)),
  addItem: (item) => dispatch(addItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
