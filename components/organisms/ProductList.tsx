'use client'
import { Condition, findAll, readAll } from '@/firebase/base'
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
  title?: string
  id?: string
  conditions: Condition<any>[]
}
const colors = [
  '#025464',
  '#E57C23',
  '#F8F1F1',
  '#9CA777',
  '#7C9070',
  '#263A29',
  '#000000',
  '#E96479',
  '#B99B6B',
  '#E4C988'
]
const catDetails = {
  QD: 'Quần Dài',
  QN: 'Quần Short',
  AK: 'Áo Khoác',
  AT: 'Áo Thun'
}

const ProductList: React.FC<ProductListProps> = ({ id, conditions, title }) => {
  const { setValue, control } = useForm<{ products: ProductType[] }>({
    defaultValues: {
      products: []
    }
  })

  const refactorData = async (data: Array<ProductType>) => {
    const products = data.map(async (item) => {
      const names = [1, 2, 3, 4]
      try {
      } catch (error) {}
      const imagesURL = names.map(async (name) => {
        try {
          const imageRef = ref(
            storage,
            'products/' +
              item.imageName
                .trim()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLocaleLowerCase()
                .replace(/\s/g, '_') +
              '/' +
              name
          )
          const imageURL = await getDownloadURL(imageRef)
          return imageURL
        } catch (error) {
          return ''
        }
      })

      return {
        ...item,
        imagesURL: await Promise.all(imagesURL)
      }
    })
    return await Promise.all(products)
  }
  const fetch = async () => {
    const productRef = await collection(db, 'products')

    if (conditions.length == 0) {
      await readAll(productRef)
        .then(async (data) => {
          setValue('products', await refactorData(data))
        })
        .catch((error) => console.log(error))
    } else {
      await findAll<ProductType>(productRef, conditions)
        .then(async (data) => {
          console.log('products', await refactorData(data))
          if (data) setValue('products', await refactorData(data))
        })
        .catch((error) => console.log(error))
    }
  }
  useEffect(() => {
    fetch()
  }, [conditions])
  return (
    <section className="bg-white" id={id}>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {title && <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <Controller
            name="products"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <>
                {[...field.value].map((item) => (
                  <Link href={`/product/${item.id}`} key={item.id}>
                    <div
                      key={item?.imagesURL[0]}
                      className="w-[90%] min-w-[270px] md:max-w-[280px] md:w-[33.333%] lg:w-[25%] bg-white rounded-2xl flex flex-col p-4 gap-2 shadow-2xl hover:scale-95 transition-all ease-linear h-full flex-1"
                    >
                      <div className="w-full h-[240px] relative overflow-hidden">
                        <Image
                          src={item.imagesURL[0] || 'https://www.freeiconspng.com/img/23494'}
                          unoptimized
                          width={10}
                          height={100}
                          alt=""
                          className="w-full max-h-[240px] object-contain md:object-cover"
                        />
                      </div>
                      <div className="flex items-start justify-between flex-1">
                        <p className="w-fit p-2 h-7 rounded-md border-2 border-black flex items-center text-black justify-center font-bold text-xs">
                          {item.name}
                        </p>
                        <p className="w-fit p-2 h-7 rounded-md border-2 border-black flex items-center text-black justify-center font-bold text-xs">
                          Thể loại: {catDetails[item.category]}
                        </p>
                      </div>

                      <div className="w-full text-white text-sm flex-1 flex items-start justify-between gap-2">
                        <p className="text-white bg-red-600 font-medium rounded-lg text-xs px-4 py-2">
                          Giá: {Number(item.price)?.toLocaleString()}
                        </p>
                        <div className="flex flex-1 flex-wrap justify-end gap-1">
                          <div className="flex flex-1 flex-wrap gap-1">
                            {colors.map(
                              (color) =>
                                item.colors?.includes(color) && (
                                  <p
                                    key={color}
                                    className={clsx(`w-4 h-4 rounded-full border-2`, {
                                      'border-black': item.colors?.includes(color),
                                      'bg-[#025464]': color === '#025464',
                                      'bg-[#E57C23]': color === '#E57C23',
                                      'bg-[#F8F1F1]': color === '#F8F1F1',
                                      'bg-[#9CA777]': color === '#9CA777',
                                      'bg-[#7C9070]': color === '#7C9070',
                                      'bg-[#263A29]': color === '#263A29',
                                      'bg-[#000000]': color === '#000000',
                                      'bg-[#E96479]': color === '#E96479',
                                      'bg-[#B99B6B]': color === '#B99B6B',
                                      'bg-[#E4C988]': color === '#E4C988'
                                    })}
                                  />
                                )
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="w-full text-white text-sm flex-1 flex items-start justify-between gap-2">
                        <div className="flex gap-1 flex-1 flex-wrap justify-start">
                          {[...item.sizes].map((item, index) => (
                            <p
                              key={item + index}
                              className={clsx(
                                'w-6 h-6 rounded-md border-2 cursor-pointer border-black flex items-center text-black justify-center font-bold text-[9px]'
                              )}
                            >
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}
          />
        </div>
      </div>
    </section>
  )
}
export default ProductList
