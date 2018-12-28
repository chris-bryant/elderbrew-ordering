import React, { Component } from 'react'
import { Button, Input } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedNumber } from 'react-intl'

export class OrderItem extends Component {
  removeItem = () => {
    const { item, removeItem } = this.props

    removeItem(item.id)
  }

  updateItemQuantity = (e) => {
    const { item, updateItemQuantity } = this.props

    updateItemQuantity(item.id, e.target.value)
  }

  render() {
    const { item } = this.props

    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>
          <Input
            type="number"
            value={item.quantity}
            onChange={this.updateItemQuantity}
          />
        </td>
        <td>
          <FormattedNumber
            value={item.cost}
            style="currency"
            currency={'USD'}
            currencyDisplay={'symbol'}
          />
        </td>
        <td>
          <Button color="danger" onClick={this.removeItem}>
            <FontAwesomeIcon icon="minus" />
          </Button>
        </td>
      </tr>
    )
  }
}

OrderItem.propTypes = {}

export default OrderItem
