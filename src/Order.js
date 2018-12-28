import React, { Component } from 'react'
import {
  Card,
  Table,
  Collapse,
  Button,
  Input
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import OrderItem from './OrderItem'
import { FormattedNumber } from 'react-intl'
import sumBy from 'lodash/sumBy'

export class Order extends Component {
  state = {
    showOrder: false
  }

  toggle = () => {
    this.setState({
      showOrder: !this.state.showOrder
    })
  }

  render() {
    const { showOrder } = this.state
    const { items, removeItem, updateItemQuantity } = this.props

    const icon = showOrder ? 'chevron-up' : 'chevron-down'
    const itemsWithCost = items.map(item => {
      let itemPrice = item.price1to39
      if (item.quantity > 30) {
        itemPrice = item.price40to199
      } else if (item.quantity > 199) {
        itemPrice = item.price200
      }

      return {
        ...item,
        cost: itemPrice * item.quantity * item.packSize
      }
    })

    const total = sumBy(itemsWithCost, 'cost')

    return (
      <>
        <h1>
          Order
          <Button color="primary" onClick={this.toggle} style={{ float: 'right'}}>
            <FontAwesomeIcon icon={icon} />
          </Button>
        </h1>
        <Collapse isOpen={showOrder}>
          <Card body>
            <Table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Cost</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {itemsWithCost.map(item => (
                  <OrderItem
                    key={item.id}
                    item={item}
                    removeItem={removeItem}
                    updateItemQuantity={updateItemQuantity}
                  />
                ))}
                <tr>
                  <td>
                    <h3>Subtotal</h3>
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <h3>
                      <FormattedNumber
                        value={total}
                        style="currency"
                        currency={'USD'}
                        currencyDisplay={'symbol'}
                      />
                    </h3>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Collapse>
      </>
    )
  }
}

Order.propTypes = {}

export default Order
