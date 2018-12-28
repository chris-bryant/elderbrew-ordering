import { connect } from 'react-redux'
import {
  removeItem,
  updateItemQuantity
} from './reducers/order'
import Order from './Order'

const mapStateToProps = state => ({
  items: state.order.items
})

const mapDispatchToProps = dispatch => ({
  removeItem: (id) => dispatch(removeItem(id)),
  updateItemQuantity: (id, quantity) =>
    dispatch(updateItemQuantity(id, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(Order)
