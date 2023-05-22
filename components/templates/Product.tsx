'usec client'
import Link from 'next/link'
import React from 'react'
import { FaTshirt } from 'react-icons/fa'
import { GiArmoredPants, GiSleevelessJacket } from 'react-icons/gi'
import { ProductList } from '../organisms'

interface ProductProps {
  gender?: 'women' | 'men' | 'all'
}
const Product: React.FC<ProductProps> = ({}) => {
  return (
    <div>
      <div className="fixed w-10 h-fit flex flex-col gap-1 top-[30%] right-[5%]">
        <Link
          href="/product#AT"
          className="relative w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center after:content-['→'] after:absolute after:w-10 after:h-10 after:hidden hover:after:block ease-linear after:-left-5 after:top-[10px]"
          passHref
          scroll
        >
          <FaTshirt size={18} />
        </Link>
        <Link
          href="/product#AK"
          className="relative w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center after:content-['→'] after:absolute after:w-10 after:h-10 after:hidden hover:after:block ease-linear after:-left-5 after:top-[10px]"
          passHref
          scroll
        >
          <GiSleevelessJacket size={18} />
        </Link>
        <Link
          href="/product#Q"
          className="relative w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center after:content-['→'] after:absolute after:w-10 after:h-10 after:hidden hover:after:block ease-linear after:-left-5 after:top-[10px]"
          passHref
          scroll
        >
          <GiArmoredPants size={18} />
        </Link>
      </div>
      <ProductList id="AT" conditions={[['category', 'AT']]} title="Áo thun - T-shirt" />
      <ProductList id="AK" conditions={[['category', 'AK']]} title="Áo khoác - Jacket" />
      <ProductList id="Q" conditions={[['category', 'Q']]} title="Quần - Pants" />
      <ProductList id="AK" conditions={[['category', 'AK']]} title="Áo khoác" />
    </div>
  )
}

export default Product
