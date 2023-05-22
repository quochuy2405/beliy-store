'use client'
import { OrderSumaries } from '@/components/templates'
import { RootState } from '@/redux/features/store'
import { useSelector } from 'react-redux'

const OrderSumariesPage = () => {
  const cart = useSelector((state: RootState) => state.cart)
  const props = {
    orders: cart
  }
  return <OrderSumaries {...props} />
}
export default OrderSumariesPage
