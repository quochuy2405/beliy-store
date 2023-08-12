<script setup lang="ts">
import { VButton } from '@/components/atoms'
import { VImageProductSlide } from '@/components/molecules'
import { read } from '@/composables/firebase/base'
import { storage } from '@/composables/firebase/config'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'

const route = useRoute()
const imageActive = ref(0)
const countBuy = ref(1)
const productDetails = ref(null)
const onClick = (index: number) => {
    imageActive.value = index
}
const getProductId = async () => {
    await read('products', route.params.id as string).then(async (product) => {
        const names = [1, 2, 3, 4]
        try {
        } catch (error) {}
        const imagesURL = names.map(async (name) => {
            try {
                const imageRef = storageRef(
                    storage,
                    'products/' +
                        product.imageName
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

        const data = {
            ...product,
            imagesURL: await Promise.all(imagesURL),
            reviews: 5,
        }
        productDetails.value = data
    })
}

const increase = () => {
    countBuy.value += 1
}

const reduce = () => {
    if (countBuy.value > 1) countBuy.value -= 1
}
const ratingCount = Math.ceil(Math.random() * (30 - 10) + 10)

onMounted(() => {
    const body = document.querySelector('body')
    body.scrollTo({ top: 0, behavior: 'smooth' })
    getProductId()
})
</script>

<template>
    <div v-if="productDetails">
        <p class="text-xs p-4 font-normal">
            <NuxtLink href="/">Home</NuxtLink> /
            <NuxtLink href="/products">Product</NuxtLink> /
            {{ productDetails.name }}
        </p>
        <VImageProductSlide
            v-if="productDetails.imagesURL"
            :images="productDetails.imagesURL"
            :currentIndex="imageActive"
        />
        <VImageProductSlide
            v-if="productDetails.imagesURL"
            :images="productDetails.imagesURL"
            :currentIndex="imageActive"
            :visible="4"
            :onClick="onClick"
        />
        <div class="p-4">
            <h1 class="font-semibold text-xl">{{ productDetails.name }}</h1>
            <div class="flex items-center space-x-1 py-2">
                <svg
                    v-for="value in [1, 2, 3, 4, 5]"
                    class="w-4 h-4 stroke-slate-400"
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
                <p class="text-sm">{{ ratingCount }} reviews</p>
                <!-- <p class="text-sm">No reviews</p> -->
            </div>
            <p class="flex gap-2 text-2xl font-medium">
                <span class="text-red-600"
                    >{{
                        Number(productDetails?.price * 1000).toLocaleString()
                    }}
                    đ</span
                >
                <span class="line-through"
                    >{{
                        (
                            Number(productDetails?.price * 1000) + 20000
                        ).toLocaleString()
                    }}
                    đ</span
                >
            </p>

            <div
                class="flex items-center justify-between p-4 rounded-full w-full h-12 bg-gray-100 my-4"
            >
                <span @click="reduce"
                    ><Icon name="clarity:minus-line" class="w-5 h-5 text-base"
                /></span>

                <p class="flex-1 items-center justify-center flex text-base">
                    {{ countBuy }}
                </p>
                <span @click="increase"
                    ><Icon name="clarity:plus-line" class="w-4 h-4 text-base"
                /></span>
            </div>
            <VButton
                href="/"
                mode="default"
                class="!bg-black !rounded-full !text-white !h-12 !font-semibold !w-fit !py-3 !px-14 z-10"
                animation
            >
                Thêm vào giỏ hàng
            </VButton>
            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

            <ul>
                <li>Sku: BeliyStore137 Available</li>
                <li>Instock Vendor: BeliyStore</li>
                <li>Type: BeliyStore</li>
                <li>
                    Collections: Gift & Promotion , Limited Editions , Men’s
                    Jacket , Minimalist Jacket , Straps & Brands , Women’s
                    Jacket
                </li>
            </ul>
        </div>
    </div>
</template>
