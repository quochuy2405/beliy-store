'use client'
import { Checkout, Finish } from '@/components/templates'
import { create } from '@/firebase/base'
import { db } from '@/firebase/config'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { RootState } from '@/redux/features/store'
import { schema } from '@/resolvers/checkout'
import { OptionType, OrderType } from '@/types/common'
import { collection } from '@firebase/firestore'
import { yupResolver } from '@hookform/resolvers/yup'
import { getDistrict, getProvinces, getwards } from 'apis'
import { deleteCookie, getCookie } from 'cookies-next'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import shortid from 'shortid'
export type StateCheckoutPageType = {
  provinces: Array<OptionType>
  districts: Array<OptionType>
  wards: Array<OptionType>
}
const CheckoutPage = () => {
  const stateStore = useForm<StateCheckoutPageType>({})
  const dataForm = useForm<OrderType>({
    resolver: yupResolver(schema)
  })
  const refButton = useRef('payment_on_delivery')
  const dispatch = useDispatch()
  const params = useParams()
  const router = useRouter()
  const orders = useSelector((state: RootState) => state.cart)
  const onSubmit = async (data: OrderType) => {
    if (getCookie('checkout_id')) {
      dispatch(setLoading({ status: true, mode: 'default', title: 'Đang tạo đơn hàng' }))
      const ord = orders.map(({ id, quantityOrder, name, sizes, price }) => ({
        id,
        quantityOrder,
        name,
        sizes,
        price
      }))
      const order = {
        checkoutId: getCookie('checkout_id'),
        orders: ord,
        ...data,
        paymentMethods: refButton.current,
        status: 0
      }

      const productsRef = collection(db, 'orders')
      await create(productsRef, order)
        .then(() => {
          dispatch(closeLoading())
          if (refButton.current === 'payment_on_delivery')
            router.push(`/checkout/${params.id}/status`)
          if (refButton.current === 'momo') router.push(`/checkout/${params.id}/payment/momo`)
          if (refButton.current === 'banking') router.push(`/checkout/${params.id}/payment/momo`)
        })
        .catch(() => {
          dispatch(
            setLoading({
              status: true,
              mode: 'error',
              title: (
                <>
                  <p>'Tạo đơn hàng lỗi!'</p>
                  <Link
                    href="/"
                    onClick={() => {
                      deleteCookie('checkout_id')
                      dispatch(closeLoading())
                    }}
                    className="w-36 mx-auto mt-3 flex gap-1 justify-center items-center text-sm rounded-md bg-black py-2 font-medium text-blue-50 hover:bg-gray-700"
                  >
                    Về trang chủ
                  </Link>
                </>
              )
            })
          )
        })
    }
  }
  useEffect(() => {
    getProvinces().then(({ data }: any) => {
      if (data) {
        const provinceOpts = data.map((item) => ({
          label: item.name,
          value: item.code
        })) as unknown as OptionType[]

        stateStore.setValue('provinces', provinceOpts)
      }
    })
  }, [])
  const onChangeProvince = async (proviceId: string) => {
    dataForm.setValue('district', '')
    dataForm.setValue('award', '')
    stateStore.resetField('districts')
    stateStore.resetField('wards')
    console.log('reset')
    await getDistrict(proviceId).then(({ data }: any) => {
      const districts = data.districts
      if (districts) {
        const districtOpts = districts.map((item) => ({
          label: item.name,
          value: item.code
        })) as unknown as OptionType[]

        stateStore.setValue('districts', districtOpts)
      }
    })
  }

  const onChangeDistricts = async (districtId: string) => {
    dataForm.setValue('award', '')
    // stateStore.resetField('wards')
    await getwards(districtId).then(({ data }: any) => {
      const wards = data.wards
      if (wards) {
        const wardsOpts = wards.map((item) => ({
          label: item.name,
          value: item.code
        })) as unknown as OptionType[]

        stateStore.setValue('wards', wardsOpts)
      }
    })
  }
  const props = {
    stateStore,
    dataForm,
    orders,
    refButton,
    onSubmit,
    onChangeDistricts,
    onChangeProvince
  }
  if (!shortid.isValid(params.id) || params.id != getCookie('checkout_id'))
    return <Finish status="error" />
  return <Checkout {...props} />
}

export default CheckoutPage
