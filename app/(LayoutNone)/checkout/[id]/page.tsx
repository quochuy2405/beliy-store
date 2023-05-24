'use client'
import { Checkout } from '@/components/templates'
import { RootState } from '@/redux/features/store'
import { schema } from '@/resolvers/checkout'
import { OptionType, OrderType } from '@/types/common'
import { yupResolver } from '@hookform/resolvers/yup'
import { getwards, getDistrict, getProvinces } from 'apis'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
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
  const orders = useSelector((state: RootState) => state.cart)
  const onSubmit = (data: any) => {
    console.log(data)
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
  const props = { stateStore, dataForm, orders, onSubmit, onChangeDistricts, onChangeProvince }
  return <Checkout {...props} />
}

export default CheckoutPage
