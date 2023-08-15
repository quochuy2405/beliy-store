<script setup lang="ts">
import { VProduct, VSkeleton } from '@/components/molecules'
import { findAll } from '@/composables/firebase/base'
import { db, storage } from '@/composables/firebase/config'
import { ProductType } from '@/types/product'
import { collection } from '@firebase/firestore'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'

definePageMeta({
    layout: 'default',
    layoutTransition: {
        name: 'layout',
    },
})
useHead({
    title: 'Sản phẩm của Beliy 🧑‍💻',
})
// variables
const categories = [
    { id: 1, name: 'Shirts', value: '', thumnail: '' },
    { id: 2, name: 'Jackets', value: '', thumnail: '' },
    { id: 3, name: 'Crop Top', value: '', thumnail: '' },
    { id: 4, name: 'Baby Tee', value: '', thumnail: '' },
    { id: 5, name: 'New Products', value: '', thumnail: '' },
]
let time: NodeJS.Timeout
const styleView = ref<'small' | 'medium'>('small')

// functions
const onSliderScroll = (e) => {
    clearTimeout(time)

    time = setTimeout(() => {
        const sliderItem = document.querySelector('.slider-item')
        const sliderScrollLeft = e.target.scrollLeft
        const index = Math.round(sliderScrollLeft / sliderItem.clientWidth)
        e.target.scrollTo({
            left: index * sliderItem.clientWidth,
            behavior: 'smooth',
        })
    }, 300)
}

const refactorData = async (data: Array<ProductType>) => {
    const _products = data.map(async (item) => {
        const names = [0, 1, 2, 3, 4]
        try {
        } catch (error) {}
        const imagesURL = names.map(async (name) => {
            try {
                const imageRef = storageRef(
                    storage,
                    'products/' +
                        item.imageName
                            .trim()
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .toLocaleLowerCase()
                            .replace(/\s/g, '_') +
                        '/' +
                        name,
                )
                const imageURL = await getDownloadURL(imageRef)
                return imageURL
            } catch (error) {
                return ''
            }
        })

        return {
            ...item,
            imagesURL: await Promise.all(imagesURL),
        }
    })
    return await Promise.all(_products)
}

const fetch = async () => {
    const productRef = await collection(db, 'products')

    const data = await findAll<ProductType>(productRef, [])
        .then(async (data: Array<ProductType>) => {
            if (data) {
                return await refactorData(data)
            }
        })
        .catch(() => {
            return []
        })

    return data
}

const { data: products } = useLazyAsyncData('product', fetch, {
    server: false,
})
onMounted(() => {
    const body = document.querySelector('body')
    body.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>
<template>
    <div>
        <div
            class="flex w-full h-48 lg:h-[40vh] overflow-hidden px-3 flex-col gap-1 mb-3 relative"
        >
            <img src="/img/JACKET3-1.png" class="filter blur-[1px]" />
            <div
                class="absolute-center flex items-center justify-center gap-1 flex-col text-white"
            >
                <h1 class="heading font-bold text-white">Products</h1>
                <p class="text-sm"><span>Home</span>/ <span>Product</span></p>
            </div>
        </div>
        <div
            class="w-screen overflow-y-scroll lg:w-fit m-auto lg:hidden-scrollbar"
            @scroll="onSliderScroll"
        >
            <div
                class="flex flex-nowrap w-fit transition-all ease-[cubic-bezier(0.16, 1, 0.29, 0.99)] duration-1000"
            >
                <div
                    class="w-[50vw] lg:w-[19vw] px-3 flex flex-col gap-2 relative slider-item"
                    v-for="category in categories"
                    :data-value="category.id"
                    :id="`slider-item-${category.id}`"
                >
                    <div
                        class="w-full h-60 md:h-72 lg:h-[500px] rounded-sm overflow-hidden relative"
                    >
                        <div
                            class="absolute bottom-4 flex justify-center items-center w-full"
                        >
                            <p
                                class="h-9 text-sm px-8 py-2 rounded-full bg-white text-black"
                            >
                                {{ category.name }}
                            </p>
                        </div>
                        <img
                            src="/img/JACKET3-1.png"
                            class="w-full h-full z-0 object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-end gap-5 p-4 lg:w-5/6 m-auto">
            <ClientOnly
                ><div
                    class="w-9 h-9 bg-white shadow flex items-center justify-center rounded-full button-action"
                    :class="{ '!bg-black text-white': styleView == 'small' }"
                    @click="styleView = 'small'"
                >
                    <Icon name="ci:grid-big-round" class="w-4 h-4" />
                </div>
                <div
                    class="w-9 h-9 bg-white shadow flex items-center justify-center rounded-full button-action"
                    :class="{ '!bg-black text-white': styleView == 'medium' }"
                    @click="styleView = 'medium'"
                >
                    <Icon
                        name="material-symbols:format-list-bulleted"
                        class="w-4 h-4"
                    />
                </div>
            </ClientOnly>
        </div>
        <div
            class="px-3 lg:w-5/6 m-auto"
            :class="{
                'grid-cols-2 grid lg:grid-cols-4 xl:grid-cols-5':
                    styleView == 'small',
                'grid-cols-1 grid lg:grid-cols-2': styleView == 'medium',
            }"
        >
            <VProduct
                v-for="product in products"
                :data="product"
                :mode="styleView"
                :class="{ 'fade-in': products }"
                wFull
            />

            <VSkeleton :mode="styleView" v-if="!products" />
            <VSkeleton :mode="styleView" v-if="!products" />
        </div>
    </div>
</template>
