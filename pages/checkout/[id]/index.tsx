'use client'
import { Checkout, Finish } from '@/components/templates'
import { checkQuantityBeforeAddOrder, create } from '@/firebase/base'
import { db } from '@/firebase/config'
import { DefaultLayout } from '@/layouts/Layouts'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { RootState } from '@/redux/features/store'
import { schema } from '@/resolvers/checkout'
import { OptionType, OrderType } from '@/types/common'
import { collection } from '@firebase/firestore'
import { yupResolver } from '@hookform/resolvers/yup'
import { getDistrict, getProvinces, getwards } from 'apis'
import { deleteCookie, getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import shortid from 'shortid'
import emailjs from 'emailjs-com'
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
  const router = useRouter()
  const orders = useSelector((state: RootState) => state.cart)
  const onSubmit = async (data: OrderType) => {
    if (getCookie('checkout_id')) {
      dispatch(setLoading({ status: true, mode: 'default', title: 'Đang tạo đơn hàng' }))
      const message = await checkQuantityBeforeAddOrder(orders)
      if (message === 'pass') {
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
          award: data.award.label,
          province: data.province.label,
          district: data.district.label,
          paymentMethods: refButton.current,
          status: 0,
          isCharge: false
        }

        const ordersRef = collection(db, 'orders')
        await create(ordersRef, order)
          .then(async () => {
            await dispatch(closeLoading())

            const currentDate = new Date()
            const formattedDate = `${currentDate.getDate()}/${
              currentDate.getMonth() + 1
            }/${currentDate.getFullYear()}`

            const templateParams = {
              name: data.name,
              to_email: data.email,
              code: order.checkoutId,
              date: formattedDate,
              payment: refButton.current,
              address: [data.addressNumber, data.award, data.district, data.province].join('/')
            } as any
            try {
              emailjs.send(
                'service_lzz7b0g',
                'template_y2qzybl',
                templateParams,
                'user_ZnFDDoy5P7tFdH0eaml2J'
              )
            } catch (error) {
              console.log(error)
            }

            if (refButton.current === 'payment_on_delivery')
              router.push(`/checkout/${router.query.id}/status`)
            if (refButton.current === 'momo')
              router.push(`/checkout/${router.query.id}/payment/momo`)
            if (refButton.current === 'banking')
              router.push(`/checkout/${router.query.id}/payment/banking`)
          })
          .catch(() => {
            dispatch(
              setLoading({
                status: true,
                mode: 'error',
                title: (
                  <>
                    <p>'Tạo đơn hàng lỗi!'</p>
                    <div
                      onClick={() => {
                        deleteCookie('checkout_id')
                        dispatch(closeLoading())
                        router.push('/')
                      }}
                      className="w-36 mx-auto mt-3 flex gap-1 justify-center items-center text-sm rounded-md bg-black py-2 font-medium text-blue-50 hover:bg-gray-700"
                    >
                      Về trang chủ
                    </div>
                  </>
                )
              })
            )
          })
      } else {
        dispatch(
          setLoading({
            status: true,
            mode: 'error',
            title: (
              <div className="flex items-center justify-center flex-col">
                <p className="text-base">Ối dồi ôi!!!</p>
                <p className="text-sm">
                  Ai đó đã cướp mất đơn hàng của bạn rồi í.Hãy giảm số lượng đặt lại nhé!
                </p>
                <div
                  onClick={() => {
                    deleteCookie('checkout_id')
                    dispatch(closeLoading())
                    router.push('/orders')
                  }}
                  className="w-36 mx-auto mt-3 flex gap-1 justify-center items-center text-sm rounded-md bg-black py-2 font-medium text-blue-50 hover:bg-gray-700"
                >
                  Về giỏ hàng
                </div>
              </div>
            )
          })
        )
      }
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
    dataForm.setValue('district', null)
    dataForm.setValue('award', null)
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
    dataForm.setValue('award', null)
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
  if (!shortid.isValid(router.query.id) || router.query.id != getCookie('checkout_id'))
    return <Finish status="error" />
  return <Checkout {...props} />
}

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default CheckoutPage
