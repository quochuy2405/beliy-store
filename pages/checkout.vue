<script setup lang="ts">
import { VButton, VSelect, VTextField } from '@/components/atoms'
import { VCartItem } from '@/components/molecules'
import { rules } from '@/resolvers/checkout.rule'
import { useCart } from '@/stores/nuxtStore'
import { OptionType } from '@/types/common'
import useVuelidate from '@vuelidate/core'
import { storeToRefs } from 'pinia'
import shortid from 'shortid'

export interface OrderForm {
    note: string
    ward: OptionType | null
    district: OptionType | null
    province: OptionType | null
    subAddress: string
    name: string
    phone: string
}
// variables
const checkoutId = useCookie('checkoutId')
const { products } = storeToRefs(useCart())
const valid = shortid.isValid(checkoutId.value)
const formOpts = reactive({
    wards: [],
    districts: [],
    provinces: [],
})
const formData = reactive<OrderForm>({
    note: '',
    ward: null,
    district: null,
    province: null,
    name: '',
    phone: '',
    subAddress: '',
})
const provinces = useFetch<Array<any>>('https://provinces.open-api.vn/api/', {
    server: false,
})

const control = useVuelidate(rules(formData), formData)

const submitForm = () => {
    control.value.$validate()
    if (!control.value.$error) {
        //    Some code
    }
}

watch(
    () => provinces.data.value,
    () => {
        const proviceOpts = provinces.data.value.map((item) => {
            return {
                label: item.name,
                value: item.code,
            }
        })
        formOpts.provinces = proviceOpts
    },
)

watch(
    () => formData.province,
    async () => {
        const { data, error } = await useFetch<any>(
            `https://provinces.open-api.vn/api/p/${formData.province.value}?depth=2`,
            { server: false },
        )

        if (!error.value && data.value) {
            const districtOpts = data.value.districts.map((item) => {
                return {
                    label: item.name,
                    value: item.code,
                }
            })
            formOpts.districts = districtOpts
        }
    },
)

watch(
    () => formData.district,
    async () => {
        const { data, error } = await useFetch<any>(
            `https://provinces.open-api.vn/api/d/${formData.district.value}?depth=2`,
            { server: false },
        )

        if (!error.value && data.value) {
            console.log(data.value.wards)
            const wardOpts = data.value.wards.map((item) => {
                return {
                    label: item.name,
                    value: item.code,
                }
            })
            formOpts.wards = wardOpts
        }
    },
)

onMounted(() => {
    const body = document.querySelector('body')
    body.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<template>
    <div>
        <div v-if="checkoutId && valid && products.length">
            <form @submit.prevent="submitForm" class="w-full md:w-2/3 m-auto">
                <div
                    class="p-8 flex items-center justify-center flex-col gap-2"
                >
                    <h1 class="font-medium text-4xl px-4 text-black">
                        Đơn Hàng
                    </h1>
                    <div class="flex items-center justify-center gap-3">
                        <p class="font-medium">Home</p>
                        /
                        <p>Xác nhận đơn hàng</p>
                    </div>
                </div>
                <div class="px-4">
                    <div class="text-gray-500 h-full flex flex-col flex-1">
                        <p class="text-black text-base">Sản phẩm đã chọn</p>
                        <div class="flex-1">
                            <div class="h-[60%] overflow-y-auto">
                                <VCartItem
                                    v-for="item in products"
                                    :data="item"
                                />
                            </div>
                        </div>

                        <div>
                            <p class="text-black text-base py-2">
                                Ghi chú đơn hàng
                            </p>
                            <textarea
                                type="text"
                                class="input-default rounded-lg"
                                placeholder="Ghi chú của bạn"
                                rows="3"
                                @input="
                                    (event) =>
                                        (formData.note = (
                                            event.target as HTMLTextAreaElement
                                        ).value)
                                "
                            ></textarea>
                        </div>

                        <VTextField
                            title="Họ và tên"
                            name="name"
                            v-model="formData.name"
                            :control="control.name"
                            required
                        />

                        <VTextField
                            title="Số điện thoại"
                            name="phone"
                            v-model="formData.phone"
                            :control="control.phone"
                            required
                        />
                        <VSelect
                            title="Tỉnh/Thành Phố"
                            :options="formOpts.provinces"
                            :value="formData.province"
                            :change="(value) => (formData.province = value)"
                        />

                        <VSelect
                            title="Quận/Huyện"
                            :options="formOpts.districts"
                            :value="formData.district"
                            :change="(value) => (formData.district = value)"
                        />

                        <VSelect
                            title="Phường/Xã"
                            :options="formOpts.wards"
                            :value="formData.ward"
                            :change="(value) => (formData.ward = value)"
                        />
                        <VTextField
                            title="Số Nhà,Đường"
                            name="name"
                            v-model="formData.subAddress"
                            :control="control.subAddress"
                        />
                        <VButton
                            type="submit"
                            mode="default"
                            class="mt-4 !rounded-full !py-3"
                            animation
                            wFull
                        >
                            <p class="font-semibold uppercase text-xs">
                                Gửi đơn hàng
                            </p>
                        </VButton>
                    </div>
                </div>
            </form>
        </div>
        <div
            v-if="!checkoutId || !valid || !products.length"
            class="w-screen h-[90vh] flex flex-col items-center justify-center"
        >
            <div
                class="w-fit h-fit flex flex-col justify-center gap-2 items-center md:pb-[10%]"
            >
                <img src="/img/hacker.png" class="w-20 h-20" />
                <h2>☹️ Ôi dồi ôi. Có gì đó không đúng</h2>
                <NuxtLink
                    href="/"
                    class="py-3 m-auto rounded-full w-full px-10 text-sm uppercase font-medium text-white focus:outline-none bg-black focus:z-10 focus:ring-2 focus:ring-gray-200 button-action relative overflow-hidden text-center"
                >
                    <span class="button-wait-tap"></span>
                    <p>Về trang chủ</p>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
