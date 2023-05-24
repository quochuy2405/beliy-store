'use client'
import { Checkout } from '@/components/templates'
import { RootState } from '@/redux/features/store'
import { schema } from '@/resolvers/checkout'
import { OptionType, OrderType } from '@/types/common'
import { yupResolver } from '@hookform/resolvers/yup'
import { getAwards, getDistrict, getProvinces } from 'apis'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
export type StateCheckoutPageType = {
  provinces: Array<OptionType>
  districts: Array<OptionType>
  awards: Array<OptionType>
}
const CheckoutPage = () => {
  const stateStore = useForm<StateCheckoutPageType>({})
  const dataForm = useForm<OrderType>({
    resolver: yupResolver(schema)
  })
  const orders = useSelector((state: RootState) => state.cart)
  const onSubmit = (data: any) => {
    console.log(data)
  }
  useEffect(() => {
    getProvinces().then(({ data }: any) => {
      console.log(data)
      if (data) {
        const provinceOpts = data.map((item) => ({
          label: item.name,
          value: item.code
        })) as unknown as OptionType[]

        stateStore.setValue('provinces', provinceOpts)
      }
    })
  }, [])
  const onChangeProvince = async () => {
    const proviceId = dataForm.getValues('province')
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

  const onChangeDistricts = async () => {
    const districtId = dataForm.getValues('district')
    await getAwards(districtId).then(({ data }: any) => {
      const awards = data.awards
      if (awards) {
        const awardsOpts = awards.map((item) => ({
          label: item.name,
          value: item.code
        })) as unknown as OptionType[]

        stateStore.setValue('awards', awardsOpts)
      }
    })
  }
  const props = { stateStore, dataForm, orders, onSubmit, onChangeDistricts, onChangeProvince }
  return <Checkout {...props} />
}

export default CheckoutPage
