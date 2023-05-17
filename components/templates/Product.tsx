import React from 'react'
import { ProductList } from '../organisms'

const Product = () => {
  return (
    <div>
      <ProductList keyCondition="category" valueCondition="Q" title="Áo khoác" />
      <ProductList keyCondition="category" valueCondition="Q" title="Áo khoác" />
      <ProductList keyCondition="category" valueCondition="Q" title="Áo khoác" />
      <ProductList keyCondition="category" valueCondition="Q" title="Áo khoác" />
      {/* <ProductList keyCondition="all" />
      <ProductList keyCondition="all" />
      <ProductList keyCondition="all" />
      <ProductList keyCondition="all" /> */}
    </div>
  )
}

export default Product
