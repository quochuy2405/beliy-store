'use client'
import { ProductOverview } from '@/components/templates'
import { read } from '@/firebase/base'
import { storage } from '@/firebase/config'
import { addCart } from '@/redux/features/slices/cart'
import { ProductType } from '@/types/product'
import { getDownloadURL, ref } from 'firebase/storage'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function ProductOverviewPage() {
  const dispatch = useDispatch()

  const params = useParams()
  const [data, setData] = useState<ProductType>()

  const addToCart = (product: ProductType) => {
    // Product does not exist in the cart, add new product
    const newProduct = product
    dispatch(addCart(newProduct))
  }

  useEffect(() => {
    if (params.id) {
      read('products', params.id).then(async (product) => {
        const names = [1, 2, 3, 4]
        try {
        } catch (error) {}
        const imagesURL = names.map(async (name) => {
          try {
            const imageRef = ref(
              storage,
              'products/' +
                product.imageName
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

        setData({
          ...product,
          imagesURL: await Promise.all(imagesURL)
        })
      })
    }
  }, [params.id])

  const props = {
    addToCart,
    data
  }
  return <ProductOverview {...props} />
}
