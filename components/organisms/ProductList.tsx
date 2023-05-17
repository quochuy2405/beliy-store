'use client'
import { findAll, readAll } from '@/firebase/base'
import { db, storage } from '@/firebase/config'
import { ProductType } from '@/types/product'
import clsx from 'clsx'
import { collection } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
interface ProductListProps {
  keyCondition: string
  valueCondition?: string
  title?: string
}
const ProductList: React.FC<ProductListProps> = ({ keyCondition, valueCondition, title }) => {
  const { setValue, control } = useForm<{ products: ProductType[] }>({
    defaultValues: {
      products: []
    }
  })

  const refactorData = async (data: Array<ProductType>) => {
    const products = data.map(async (item) => {
      const imageRef = ref(
        storage,
        'products/' +
          item.imageName
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .replace(/\s/g, '_')
      )
      const imageURL = await getDownloadURL(imageRef)
      return {
        ...item,
        imageURL
      }
    })
    return await Promise.all(products)
  }
  const fetch = async () => {
    const productRef = await collection(db, 'products')
    if (keyCondition == 'all') {
      await readAll(productRef)
        .then(async (data) => {
          setValue('products', await refactorData(data))
        })
        .catch((error) => console.log(error))
    } else {
      await findAll<ProductType>('products', keyCondition, valueCondition)
        .then(async (data) => {
          if (data) setValue('products', await refactorData(data))
        })
        .catch((error) => console.log(error))
    }
  }
  useEffect(() => {
    fetch()
  }, [keyCondition])
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {title && <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <Controller
            name="products"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <>
                {field.value.map((product) => (
                  <Link
                    href={`/product/${product.id}`}
                    key={product.id}
                    className="group relative shadow-xl p-4 rounded-lg"
                  >
                    <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <Image
                        src={product.imageURL || 'https://www.freeiconspng.com/img/23494'}
                        unoptimized
                        width={10}
                        height={100}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <p className="text-black border-2 border-gray-600 bg-white font-medium rounded-lg text-xs px-4 py-2 h-9">
                          {product.name}
                        </p>

                        <div className="flex gap-1 mt-2">
                          {['S', 'M', 'L'].map((item) => (
                            <p
                              key={item}
                              className={clsx(
                                'w-7 h-7 rounded-full border-2 cursor-pointer border-gray-600 flex items-center text-black justify-center font-bold text-xs'
                              )}
                            >
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                      <p className="text-white bg-red-600 border-2 border-red-300 font-medium rounded-lg text-xs px-4 py-2 h-9">
                        Giá: {Number(product.price)?.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </>
            )}
          />
        </div>
      </div>
    </div>
  )
}
export default ProductList
