'use client'
import { OrderSumaries } from '@/components/templates'
import { HFLayout } from '@/layouts/Layouts'
import { RootState } from '@/redux/features/store'
import { ProductType } from '@/types/product'
import { setCookies } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import shortid from 'shortid'
export type DataFormType = {
  orders: Array<ProductType>
}
const OrderSumariesPage = () => {
  const orders = useSelector((state: RootState) => state.cart)
  const router = useRouter()
  const dataForm = useForm<DataFormType>({
    defaultValues: { orders }
  })
  const onCheckout = async () => {
    if (orders.length) {
      const id = await shortid.generate()
      await setCookies('checkout_id', id)
      await router.push('/checkout/' + id)
    }
  }
  const props = {
    orders,
    dataForm,
    onCheckout
  }

  return <OrderSumaries {...props} />
}

OrderSumariesPage.getLayout = function getLayout(page: ReactElement) {
  return <HFLayout>{page}</HFLayout>
}
export default OrderSumariesPage
