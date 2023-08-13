<script setup lang="ts">
import { useCart } from '@/stores/nuxtStore'
import { ProductType } from '@/types/product'
import { findItemInArray } from '@/utils/observer'
import { storeToRefs } from 'pinia'

interface Props {
    data: ProductType
}

const props = withDefaults(defineProps<Props>(), {})

const { data } = toRefs(props)
const { products } = storeToRefs(useCart())
const router = useRouter()
const gotoProductPage = (path: string) => {
    router.push({ path })
}

const increase = () => {
    const existData = findItemInArray(products.value, data.value)
    if (existData) {
        existData.quantityOrder += 1
    }
}

const reduce = () => {
    const existData = findItemInArray(products.value, data.value)
    if (existData && existData.quantityOrder > 1) existData.quantityOrder -= 1
}

const remove = () => {
    const productIdToRemove = data.value.id
    products.value = products.value.filter(
        (item) => item.id !== productIdToRemove,
    )
}
</script>
<template>
    <div v-if="data && data.quantityOrder > 0" class="flex h-40 p-4 gap-2">
        <img
            :src="data.imagesURL[0]"
            alt=""
            class="w-24 h-full rounded-md object-cover"
        />
        <div class="flex gap-1 justify-between flex-1 flex-col">
            <label
                for="hamburger"
                @click="gotoProductPage(`/products/${data.id}`)"
                ><h1 class="text-sm font-medium text-black h-fit">
                    {{ data.name }}
                </h1></label
            >
            <div class="flex items-center space-x-1 py-2">
                <div
                    class="w-9 h-4 bg-black flex shadow items-center justify-center rounded-full button-action"
                >
                    <p class="text-white text-xs">{{ data.sizes[0] }}</p>
                </div>
                <svg
                    v-for="value in [1, 2, 3, 4, 5]"
                    class="w-3 h-3 stroke-slate-400 m-auto"
                    :class="{
                        'text-white': value == 5,
                        'text-black': value != 5,
                    }"
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

            <div class="flex gap-2 flex-col h-fit">
                <p class="text-black text-base">
                    {{ Number(data.price * 1000).toLocaleString() }} đ
                </p>
                <div
                    class="flex items-center justify-between p-4 rounded-full w-32 h-8 bg-gray-100"
                >
                    <span @click="reduce"
                        ><Icon
                            name="clarity:minus-line"
                            class="w-5 h-5 text-base text-black"
                    /></span>

                    <p
                        class="flex-1 items-center justify-center flex text-base text-black"
                    >
                        {{ data.quantityOrder }}
                    </p>
                    <span @click="increase"
                        ><Icon
                            name="clarity:plus-line"
                            class="w-4 h-4 text-base text-black"
                    /></span>
                </div>
            </div>
        </div>

        <div @click="remove" class="h-fit p-2">
            <ClientOnly>
                <Icon
                    name="solar:trash-bin-2-broken"
                    class="w-5 h-5 hover:text-red-500"
                />
            </ClientOnly>
        </div>
    </div>
</template>
