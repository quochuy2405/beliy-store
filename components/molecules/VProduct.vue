<script setup lang="ts">
import { useCart, useToast } from '@/stores/nuxtStore'
import { ProductType } from '@/types/product'
import { VButton } from '../atoms'
import { storeToRefs } from 'pinia'
import { findItemInArray } from '@/utils/observer'

defineOptions({
    inheritAttrs: false,
})

interface Props {
    data: ProductType
    mode?: 'small' | 'medium'
    wFull?: boolean
}
// variables
const props = withDefaults(defineProps<Props>(), {
    mode: 'small',
    wFull: false,
})
const { mode, data, wFull } = toRefs(props)

const { products } = storeToRefs(useCart())
const { isShow, status, content } = storeToRefs(useToast())
// functions

const handleShowToast = (contentVal: string) => {
    isShow.value = true
    status.value = 'success'
    content.value = contentVal
}
const addToCart = () => {
    const existData = findItemInArray(products.value, data.value)
    if (existData) {
        handleShowToast('Đã cập nhật')
        existData.quantityOrder += 1
    } else {
        handleShowToast('Đã thêm vào giỏ')
        data.value.quantityOrder = 1

        products.value = [...products.value, data.value]
    }
}
</script>

<template>
    <div
        v-if="mode === 'small' && data?.name"
        class="w-[50vw] md:w-[33.333333333vw] lg:w-[20vw] px-3 flex flex-col gap-2 relative pb-4"
        :class="{
            '!w-full': wFull,
        }"
    >
        <div
            class="group w-full md:h-[400px] h-60 rounded-sm overflow-hidden relative cursor-pointer"
        >
            <nuxt-img
                provider="huypuiKit"
                :src="data?.imagesURL[0]"
                alt="beliy"
                class="w-full z-[3] h-full object-cover absolute group-hover:z-[4] group-hover:fade-out duration-1000"
            />
            <nuxt-img
                provider="huypuiKit"
                :src="data?.imagesURL[2]"
                alt="beliy"
                class="w-full h-full z-[2] object-cover absolute group-hover:z-[5] group-hover:fade-in"
            />
        </div>
        <NuxtLink
            :href="`/products/${data?.id}`"
            class="text-xs lg:text-sm font-semibold uppercase h-8 line-clamp-2"
            >{{ data?.name || '' }}</NuxtLink
        >

        <div class="flex items-center space-x-1">
            <svg
                v-for="_ in [1, 2, 3, 4, 5]"
                class="w-4 h-4 text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                />
            </svg>
        </div>

        <p class="flex gap-2 text-sm font-medium font-did">
            <span class="text-red-600"
                >{{ Number(data?.price * 1000).toLocaleString() }} đ</span
            >
            <span class="line-through"
                >{{
                    (Number(data?.price * 1000) + 20000).toLocaleString()
                }}
                đ</span
            >
        </p>
        <div class="absolute bottom-40 right-6 flex flex-col gap-2 z-10">
            <ClientOnly
                ><NuxtLink
                    :href="`/products/${data.id}`"
                    class="w-9 h-9 bg-white shadow flex items-center justify-center rounded-full button-action"
                >
                    <Icon name="healthicons:eyes" class="w-4 h-4 text-black" />
                </NuxtLink>
                <div
                    @click="addToCart"
                    class="w-9 h-9 bg-white flex shadow items-center justify-center rounded-full button-action"
                >
                    <Icon
                        name="teenyicons:basket-minus-outline"
                        class="w-3 h-3 text-black"
                    /></div
            ></ClientOnly>
        </div>

        <span
            class="w-6 h-6 rounded-full bg-black border-2 border-gray-300 p-2 box-border"
        ></span>
    </div>
    <div
        v-if="mode === 'medium' && data?.name"
        class="w-full px-3 flex flex-col gap-2 relative pb-5"
    >
        <div class="w-full h-[400px] lg:h-[400px] rounded-sm overflow-hidden">
            <nuxt-img
                provider="huypuiKit"
                :src="data?.imagesURL[0] || ''"
                alt="beliy"
                class="w-full h-full z-0 object-cover"
            />
        </div>
        <NuxtLink
            :href="`/products/${data.id}`"
            class="text-xs lg:text-sm font-semibold uppercase h-8 line-clamp-2"
            >{{ data?.name || '' }}</NuxtLink
        >

        <div class="flex items-center space-x-1">
            <svg
                v-for="_ in [1, 2, 3, 4, 5]"
                class="w-4 h-4 text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                />
            </svg>
        </div>

        <p class="flex gap-2 text-sm font-medium font-did">
            <span class="text-red-600"
                >{{ Number(data?.price * 1000).toLocaleString() }} đ</span
            >
            <span class="line-through"
                >{{
                    (Number(data?.price * 1000) + 20000).toLocaleString()
                }}
                đ</span
            >
        </p>
        <div class="flex justify-between items-center pr-7">
            <VButton
                @click="addToCart"
                class="!bg-black !rounded-full !text-white !w-fit !py-3 px-14 z-10 uppercase"
            >
                Add to cart
            </VButton>
            <span
                class="w-6 h-6 rounded-full bg-black border-2 border-gray-300 p-2 box-border"
            ></span>
        </div>
    </div>
</template>
