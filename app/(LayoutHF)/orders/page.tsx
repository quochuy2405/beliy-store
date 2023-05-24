'use client'
import { OrderSumaries } from '@/components/templates'
import { RootState } from '@/redux/features/store'
import { ProductType } from '@/types/product'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
export type DataFormType = {
  orders: Array<ProductType>
}
const OrderSumariesPage = () => {
  const orders = useSelector((state: RootState) => state.cart)
  const dataForm = useForm<DataFormType>({
    defaultValues: { orders }
  })
  const props = {
    orders,
    dataForm
  }
  return <OrderSumaries {...props} />
}
export default OrderSumariesPage
