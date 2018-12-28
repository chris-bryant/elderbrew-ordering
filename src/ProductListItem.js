import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedNumber } from 'react-intl'
import { Button } from 'reactstrap'

export class ProductListItem extends Component {
  addItem = () => {
    const { addItem, product } = this.props

    addItem(product)
  }

  render() {
    const { product } = this.props

    return (
      <tr>
        <td>{product.name}</td>
        <td>{product.packSize}</td>
        <td>
          <FormattedNumber
            value={product.price1to39}
            style="currency"
            currency={'USD'}
            currencyDisplay={'symbol'}
          />
        </td>
        <td>
          <FormattedNumber
            value={product.price40to199}
            style="currency"
            currency={'USD'}
            currencyDisplay={'symbol'}
          />
        </td>
        <td>
          <FormattedNumber
            value={product.price200}
            style="currency"
            currency={'USD'}
            currencyDisplay={'symbol'}
          />
        </td>
        <td>
          <Button color="success" size="sm" onClick={this.addItem}>
            <FontAwesomeIcon icon="plus" /> Add
          </Button>
        </td>
      </tr>
    )
  }
}

ProductListItem.propTypes = {}

export default ProductListItem
