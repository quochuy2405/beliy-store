'use client'
import { Product } from '@/components/templates'
import { readAll } from '@/firebase/base'
import { db } from '@/firebase/config'
import { HFLayout } from '@/layouts/Layouts'
import { collection } from '@firebase/firestore'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useForm } from 'react-hook-form'

const ProductPage = () => {
  const stateStore = useForm({
    defaultValues: {
      categories: []
    }
  })
  const { query, isReady } = useRouter()

  useEffect(() => {
    if (isReady) {
      const categoriesRef = collection(db, 'categories')
      readAll(categoriesRef)
        .then((data) => {
          stateStore.setValue('categories', data)
        })
        .catch((error) => console.log(error))
    }
  }, [isReady])
  const props = {
    stateStore,
    gender: query.type as string
  }
  return <Product {...props} />
}
ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <HFLayout>{page}</HFLayout>
}
export default ProductPage
