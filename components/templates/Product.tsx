'usec client'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { ProductList } from '../organisms'

interface ProductProps {
  gender?: string
  stateStore: UseFormReturn<any, any>
}
const Product: React.FC<ProductProps> = ({ gender, stateStore }) => {
  return (
    <div className="py-6">
      <div className="fixed w-10 h-fit flex flex-col gap-1 top-[30%] right-[5%]">
        {/* <Link
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
        </Link> */}
      </div>
      <Controller
        name="categories"
        control={stateStore.control}
        render={({ field }) => {
          return (
            <>
              {field.value.map((item) => (
                <ProductList
                  id={item.code}
                  conditions={
                    gender
                      ? [
                          ['category', item.code],
                          ['gender', gender]
                        ]
                      : [['category', item.code]]
                  }
                  title={item.name}
                />
              ))}
            </>
          )
        }}
      />
    </div>
  )
}

export default Product
