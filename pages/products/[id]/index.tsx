'use client'
import { ProductOverview } from '@/components/templates'
import { create, findAll, read, update } from '@/firebase/base'
import { db, storage } from '@/firebase/config'
import { HFLayout } from '@/layouts/Layouts'
import { addCart } from '@/redux/features/slices/cart'
import { RootState } from '@/redux/features/store'
import { ProductType } from '@/types/product'
import { collection } from '@firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ProductOverviewPage = () => {
  const dispatch = useDispatch()
  const [refresh, setRefresh] = useState(false)
  const { query } = useRouter()
  const [data, setData] = useState<ProductType>()
  const user = useSelector((state: RootState) => state.user)

  const addToCart = (product: ProductType) => {
    // Product does not exist in the cart, add new product
    const newProduct = product
    dispatch(addCart(newProduct))
  }
  const addRatting = async (rate: number) => {
    if (!user.email) {
      enqueueSnackbar('Để đánh giá bạn cần phải đăng nhập', { variant: 'warning' })
      return
    }
    const rattingRef = collection(db, 'rattings')
    findAll(rattingRef, [
      ['productid', query?.id as any],
      ['uid', user.email as any]
    ]).then(async (rattings) => {
      if (!rattings?.length) {
        await create(rattingRef, { uid: user.email, rate, productid: data.id })
          .then(() => {
            enqueueSnackbar('Đánh giá đã được gửi tới Beliy', { variant: 'success' })
          })
          .catch()
      } else {
        const rattingid = (rattings[0] as any).id
        await update(rattingRef, rattingid, { rate })
          .then(() => {
            enqueueSnackbar('Đánh giá đã được cập nhật', { variant: 'success' })
          })
          .catch()
      }
      setRefresh((cur) => !cur)
    })
  }
  useEffect(() => {
    if (query?.id) {
      const rattingRef = collection(db, 'rattings')
      const ratting = {
        average: 0,
        totalCount: 0
      }
      findAll(rattingRef, [['productid', query?.id as any]]).then((rattings) => {
        ratting.totalCount = rattings?.length || 0
        const avg =
          Number(
            rattings?.reduce((total: number, item: any) => {
              return total + Number(item?.rate)
            }, 0)
          ) / ratting.totalCount
        ratting.average = avg
      })
      read('products', query?.id as string).then(async (product) => {
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
          imagesURL: await Promise.all(imagesURL),
          reviews: ratting
        })
      })
    }
  }, [JSON.stringify(query?.id), refresh])

  const props = {
    addToCart,
    addRatting,
    data
  }
  return <ProductOverview {...props} />
}
ProductOverviewPage.getLayout = function getLayout(page: ReactElement) {
  return <HFLayout>{page}</HFLayout>
}
export default ProductOverviewPage
