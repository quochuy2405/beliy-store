'usec client'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { ProductList } from '../organisms'
import Image from 'next/image'

interface ProductProps {
  gender?: string
  stateStore: UseFormReturn<any, any>
}
const Product: React.FC<ProductProps> = ({ gender, stateStore }) => {
  return (
    <div className="pb-6">
      <div className="h-[95vh]">
        <Image
          alt=""
          width={2000}
          height={2000}
          src="/bannerpro.png"
          className="
        w-full h-full object-cover"
        />
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
