'use client'
import { OrderSumaries } from '@/components/templates'
import { RootState } from '@/redux/features/store'
import { ProductType } from '@/types/product'
import { setCookies } from 'cookies-next'
import { useRouter } from 'next/navigation'
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
  const onCheckout = () => {
    const id = shortid.generate()
    setCookies('checkout_id', id)
    router.push('/checkout/' + id)
  }
  const props = {
    orders,
    dataForm,
    onCheckout
  }

  return <OrderSumaries {...props} />
}
export default OrderSumariesPage
