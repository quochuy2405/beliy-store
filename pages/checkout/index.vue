<script setup lang="ts">
import { VButton, VSelect, VTextField } from '@/components/atoms'
import { VCartItem } from '@/components/molecules'
import { VModal } from '@/components/organisms'
import { create, read, update } from '@/composables/firebase/base'
import { db } from '@/composables/firebase/config'
import { rules } from '@/resolvers/checkout.rule'
import { useCart, useToast } from '@/stores/nuxtStore'
import { OptionType } from '@/types/common'
import { collection } from '@firebase/firestore'
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

useHead({
    title: 'Giỏ hàng 😍',
})
// variables
const router = useRouter()
const progress = ref(false)
const checkoutId = useCookie('checkoutId')
const modalOpen = useState('modalControl')
const modelType = ref<'momo' | 'bank' | 'payment_on_delivery'>(null)
const dataOrder = useCookie<{ discount: string; note: string }>('dataOrder', {
    watch: true,
})
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
const { isShow, status, content } = storeToRefs(useToast())
// functions

const handleShowToast = (
    contentVal: string,
    statusVal: 'info' | 'success' | 'error' | 'warning',
) => {
    isShow.value = true
    status.value = statusVal
    content.value = contentVal
}

const submitOrders = async (method: string) => {
    progress.value = true
    const ordersRef = collection(db, 'orders')
    const orders = products.value.map(
        ({ id, quantityOrder, name, sizes, price }) => ({
            id,
            quantityOrder,
            name,
            sizes,
            price,
        }),
    )
    const order = {
        checkoutId: checkoutId.value,
        orders: orders,
        ...formData,
        award: formData.ward.label,
        province: formData.province.label,
        district: formData.district.label,
        paymentMethods: method,
        status: 0,
        isCharge: false,
    }

    await create(ordersRef, order).then(async () => {
        await orders.forEach(async (item) => {
            const productRef = collection(db, 'products')
            const productDoc = await read('products', item.id)
            if (productDoc) {
                const productData = productDoc
                const updatedQuantity =
                    productData.quantity - item.quantityOrder
                if (updatedQuantity >= 0) {
                    await update(productRef, item.id, {
                        quantity: updatedQuantity,
                    })
                } else {
                    await handleShowToast(
                        `Sản phẩm ${item.name} đã hết`,
                        'warning',
                    )
                }
            }
            //code reduce quantity product using firebase
        })
    })

    await router.push({ path: '/checkout/status' })
    progress.value = false
}
const submitForm = async () => {
    control.value.$validate()

    if (!control.value.$error) {
        switch (modelType.value) {
            case 'momo': {
                modalOpen.value = true
                break
            }
            case 'bank': {
                modalOpen.value = true
                break
            }

            case 'payment_on_delivery': {
                progress.value = true
                submitOrders('payment_on_delivery')
                break
            }
        }
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
        formData.ward = null
        formData.district = null
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
        formData.ward = null
        const { data, error } = await useFetch<any>(
            `https://provinces.open-api.vn/api/d/${formData.district.value}?depth=2`,
            { server: false },
        )

        if (!error.value && data.value) {
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
    if (dataOrder.value) formData.note = dataOrder.value.note
})
</script>

<template>
    <div class="h-full w-full pt-8">
        <div v-if="checkoutId && valid && products.length" class="h-full">
            <form
                @submit.prevent="submitForm"
                class="w-full h-full md:w-2/3 m-auto pb-32"
            >
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
                <div class="px-4 flex flex-col">
                    <div
                        class="text-gray-500 h-full flex flex-col flex-1 lg:flex-row lg:gap-8"
                    >
                        <div class="flex-1 lg:p-5">
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
                                <p
                                    class="text-black text-base font-semibold py-2"
                                >
                                    Ghi chú đơn hàng
                                </p>
                                <textarea
                                    type="text"
                                    class="input-default rounded-lg"
                                    placeholder="Ghi chú của bạn"
                                    :value="formData.note"
                                    rows="3"
                                    @input="
                                        (event) =>
                                            (formData.note = (
                                                event.target as HTMLTextAreaElement
                                            ).value)
                                    "
                                ></textarea>
                            </div>
                        </div>

                        <div class="flex-1 lg:p-5 lg:border lg:rounded-lg">
                            <VTextField
                                title="Họ và tên"
                                name="name"
                                v-model="formData.name"
                                :value="formData.name"
                                :control="control.name"
                                required
                            />

                            <VTextField
                                title="Số điện thoại"
                                name="phone"
                                v-model="formData.phone"
                                :value="formData.phone"
                                :control="control.phone"
                                required
                            />
                            <VSelect
                                title="Tỉnh/Thành Phố"
                                :options="formOpts.provinces"
                                :value="formData.province"
                                :control="control.province"
                                :change="(value) => (formData.province = value)"
                                required
                            />

                            <VSelect
                                title="Quận/Huyện"
                                :options="formOpts.districts"
                                :value="formData.district"
                                :control="control.district"
                                :change="(value) => (formData.district = value)"
                                :disabled="!formData.province"
                                required
                            />

                            <VSelect
                                title="Phường/Xã"
                                :options="formOpts.wards"
                                :value="formData.ward"
                                :control="control.ward"
                                :disabled="!formData.district"
                                :change="(value) => (formData.ward = value)"
                                required
                            />
                            <VTextField
                                title="Số Nhà,Đường"
                                name="name"
                                :value="formData.subAddress"
                                v-model="formData.subAddress"
                                :control="control.subAddress"
                                required
                            />

                            <div
                                class="flex-1 mt-4 p-5 bg-black shadow-[0_0_3px_0_#c0c0c0b8] rounded-lg"
                            >
                                <div
                                    class="flex justify-between text-sm text-white font-medium"
                                >
                                    <h2 class="uppercase">Tạm tính</h2>
                                    <p>
                                        {{
                                            Number(
                                                products.reduce(
                                                    (total, item) => {
                                                        return (
                                                            total +
                                                            item.price *
                                                                1000 *
                                                                item.quantityOrder
                                                        )
                                                    },
                                                    0,
                                                ),
                                            ).toLocaleString()
                                        }}
                                        đ
                                    </p>
                                </div>

                                <div
                                    class="flex justify-between text-sm text-white font-medium"
                                >
                                    <h2 class="uppercase">Phí ship</h2>
                                    <p>
                                        {{ Number(30000).toLocaleString() }} đ
                                    </p>
                                </div>
                                <div
                                    class="flex justify-between text-lg text-white font-medium"
                                >
                                    <h2 class="uppercase">Tổng tiền</h2>
                                    <p class="text-green-500">
                                        {{
                                            Number(
                                                products.reduce(
                                                    (total, item) => {
                                                        return (
                                                            total +
                                                            item.price *
                                                                1000 *
                                                                item.quantityOrder
                                                        )
                                                    },
                                                    0,
                                                ) + 30000,
                                            ).toLocaleString()
                                        }}
                                        đ
                                    </p>
                                </div>
                            </div>
                            <VButton
                                type="submit"
                                mode="default"
                                @click="modelType = 'payment_on_delivery'"
                                :disabled="progress"
                                class="mt-4 !rounded-full !py-4"
                                animation
                                wFull
                            >
                                <span v-if="progress">
                                    <Icon
                                        name="eos-icons:loading"
                                        class="w-5 h-5"
                                    />
                                </span>
                                <p
                                    v-if="!progress"
                                    class="font-semibold uppercase text-sm"
                                >
                                    Thanh toán khi nhận hàng
                                </p>
                            </VButton>
                            <VButton
                                type="submit"
                                mode="default"
                                @click="modelType = 'momo'"
                                :disabled="progress"
                                class="!mt-1 !rounded-full !py-4 !bg-[#a50064]"
                                animation
                                wFull
                            >
                                <div
                                    class="flex items-center justify-center gap-4"
                                >
                                    <p class="font-semibold uppercase text-sm">
                                        Thanh toán bằng Momo
                                    </p>
                                    <span
                                        class="bg-white w-fit h-fit p-[1px] rounded-sm"
                                    >
                                        <nuxt-img
                                            src="/img/momo.png"
                                            class="w-5 h-5"
                                        />
                                    </span>
                                </div>
                            </VButton>
                            <VButton
                                type="submit"
                                mode="default"
                                @click="modelType = 'bank'"
                                :disabled="progress"
                                class="!mt-1 !rounded-full !py-4 !bg-green-500"
                                animation
                                wFull
                            >
                                <div
                                    class="flex items-center justify-center gap-4"
                                >
                                    <p class="font-semibold uppercase text-sm">
                                        Chuyển khoản ngân hàng
                                    </p>
                                    <ClientOnly>
                                        <span class="w-fit h-fit rounded-sm">
                                            <Icon
                                                name="icon-park-solid:bank-card"
                                                class="w-5 h-5 text-white"
                                            /> </span
                                    ></ClientOnly>
                                </div>
                            </VButton>
                        </div>
                    </div>
                </div>
            </form>
            <VModal v-if="!!modelType">
                <div v-if="modelType === 'momo'" class="py-5 w-full pb-10">
                    <div class="w-4/5 h-fit m-auto">
                        <nuxt-img
                            src="/img/momo-qr.png"
                            class="rounded-lg object-cover"
                        />
                    </div>

                    <VButton
                        href="/checkout/status"
                        type="submit"
                        mode="default"
                        @click="submitOrders('momo')"
                        class="mt-4 !rounded-full !py-4"
                        :disabled="progress"
                        animation
                        wFull
                    >
                        <span v-if="progress">
                            <Icon name="eos-icons:loading" class="w-5 h-5" />
                        </span>
                        <p
                            v-if="!progress"
                            class="font-semibold uppercase text-sm"
                        >
                            Xác nhận đã chuyển
                        </p>
                    </VButton>
                </div>
                <div v-if="modelType === 'bank'" class="py-5 w-full pb-10">
                    <div class="w-4/5 h-fit m-auto">
                        <nuxt-img
                            src="/img/banking-qr.png"
                            class="rounded-lg object-cover"
                        />
                    </div>
                    <VButton
                        href="/checkout/status"
                        type="submit"
                        mode="default"
                        @click="submitOrders('banking')"
                        :disabled="progress"
                        class="mt-4 !rounded-full !py-4"
                        animation
                        wFull
                    >
                        <span v-if="progress">
                            <Icon name="eos-icons:loading" class="w-5 h-5" />
                        </span>
                        <p
                            v-if="!progress"
                            class="font-semibold uppercase text-sm"
                        >
                            Xác nhận đã chuyển
                        </p>
                    </VButton>
                </div>
            </VModal>
        </div>
        <div
            v-if="!checkoutId || !valid || !products.length"
            class="w-screen h-[90vh] flex flex-col items-center justify-center"
        >
            <div
                class="w-fit h-fit flex flex-col justify-center gap-2 items-center md:pb-[10%]"
            >
                <nuxt-img src="/img/hacker.png" class="w-20 h-20" />
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
