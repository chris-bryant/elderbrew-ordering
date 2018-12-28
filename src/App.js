import React, { Component } from 'react'
import {
  Container,
  Table,
  Card,
  Input,
  Row,
  Col,
  Button
} from 'reactstrap'
import './App.css'
import sortBy from 'lodash/sortBy'
import memoize from 'lodash/memoize'
import filter from 'lodash/filter'
import { ASC, DESC, PRICE, NAME } from './constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedNumber } from 'react-intl'
import Select from 'react-select'
import OrderContainer from './OrderContainer'
import ProductListItem from './ProductListItem'

class App extends Component {
  sortByPrice = () => {
    const { priceSortDirection, setPriceSortDirection} = this.props

    setPriceSortDirection(priceSortDirection === ASC ? DESC : ASC)
  }

  sortByName = () => {
    const { nameSortDirection, setNameSortDirection } = this.props

    setNameSortDirection(nameSortDirection === ASC ? DESC : ASC)
  }

  filterByName = (e) => {
    const { setNameFilter } = this.props

    setNameFilter(e.target.value)
  }

  filterByVendor = (e) => {
    const { setVendorFilter } = this.props

    setVendorFilter(e ? e.value : '')
  }

  filterByType = (e) => {
    const { setProductTypeFilter } = this.props

    setProductTypeFilter(e ? e.value : '')
  }

  sortProducts = memoize(
    (
      priceSortDirection,
      nameSortDirection,
      nameFilter,
      vendorFilter,
      productTypeFilter,
      activeSort,
      products
    ) => {
      const productsByVendor = vendorFilter
        ? filter(products, { vendorId: vendorFilter })
        : products

      const productsByType = productTypeFilter
        ? filter(productsByVendor, { producTypeId: productTypeFilter })
        : productsByVendor

      const filteredProducts = filter(
        productsByType,
        product => product.name.toLowerCase().includes(nameFilter.toLowerCase())
      )

      const sortedProducts = sortBy(filteredProducts, product => {
        return activeSort === PRICE ? product.price1to39 : product.name
      })

      const sortValue = activeSort === PRICE
        ? priceSortDirection
        : nameSortDirection

      return sortValue === ASC
        ? sortedProducts
        : sortedProducts.reverse()
    },
    (
      priceSortDirection,
      nameSortDirection,
      nameFilter,
      vendorFilter,
      productTypeFilter,
      activeSort,
      products
    ) =>
      priceSortDirection +
      nameSortDirection +
      nameFilter +
      vendorFilter +
      productTypeFilter +
      activeSort +
      products.length
  )

  componentDidMount() {
    const { getProducts, getVendors, getProductTypes } = this.props

    getProducts()
    getVendors()
    getProductTypes()
  }

  render() {
    const {
      products,
      priceSortDirection,
      nameSortDirection,
      activeSort,
      nameFilter,
      vendors,
      vendorFilter,
      productTypes,
      productTypeFilter,
      addItem
    } = this.props

    const sortedProducts = this.sortProducts(
      priceSortDirection,
      nameSortDirection,
      nameFilter,
      vendorFilter,
      productTypeFilter,
      activeSort,
      products
    )

    return (
      <Container fluid>
        <Row>
          <Col xs="12">
            <OrderContainer />
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="4">
            <Card body>
              <label>Filter By Name</label>
              <Input
                type="text"
                onChange={this.filterByName}
              />
            </Card>
          </Col>
          <Col xs="12" sm="4">
            <Card body>
              <label>Filter By Vendor</label>
              <Select
                onChange={this.filterByVendor}
                options={vendors.map(vendor => ({
                  value: vendor.id,
                  label: vendor.name
                }))}
                isClearable
              />
            </Card>
          </Col>
          <Col xs="12" sm="4">
            <Card body>
              <label>Filter By Type</label>
              <Select
                onChange={this.filterByProductType}
                options={productTypes.map(productType => ({
                  value: productType.id,
                  label: productType.label
                }))}
                isClearable
              />
            </Card>
          </Col>
        </Row>
          <Col xs="12">
            <Table striped>
              <thead>
                <tr>
                <th onClick={this.sortByName} style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon
                    icon={
                      nameSortDirection === ASC
                        ? 'chevron-down'
                        : 'chevron-up'
                    }
                  />
                  {' '}
                  Name
                </th>
                  <th>Pack Size (lbs)</th>
                  <th onClick={this.sortByPrice} style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon
                      icon={
                        priceSortDirection === ASC
                          ? 'chevron-up'
                          : 'chevron-down'
                      }
                    />
                    {' '}
                    Price 1 - 39
                  </th>
                  <th>Price 40 - 199</th>
                  <th>Price 200+</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map(product => (
                  <ProductListItem
                    key={product.id}
                    product={product}
                    addItem={addItem}
                  />
                ))}
              </tbody>
            </Table>
          </Col>
        <Row>
        </Row>
      </Container>
    )
  }
}

export default App
