<script setup lang="ts">
import { findAll } from '@/composables/firebase/base'
import { db, storage } from '@/composables/firebase/config'
import { ProductType } from '@/types/product'
import { collection } from '@firebase/firestore'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import { VProduct, VSkeleton } from '../molecules'

interface Props {
    id: string
}
// variables
const { id } = withDefaults(defineProps<Props>(), {})
const products = ref(null)
const sliderPosition = ref(0)
const sliderStyle = computed(() => ({
    transform: `translateX(calc(${sliderPosition.value}vw/2)`,
}))
let timeInterval: NodeJS.Timeout
let timeOut: NodeJS.Timeout
const itemCount = 5
// functions
const fetch = async () => {
    const productRef = await collection(db, 'products')

    const data = await findAll<ProductType>(productRef, [])
        .then(async (data: Array<ProductType>) => {
            if (data) {
                products.value = await refactorData(data)
            }
        })
        .catch(() => {
            products.value = []
        })

    return data
}

const moveSliderLeft = async () => {
    clearInterval(timeInterval)
    clearInterval(timeOut)
    timeOut = setTimeout(() => {
        if (-sliderPosition.value / 100 >= itemCount - 1) {
            sliderPosition.value = 0
            return
        }
        sliderPosition.value -= 100
        onAutoPlay()
    }, 250)
}

const moveSliderRight = async () => {
    clearInterval(timeInterval)
    clearInterval(timeOut)
    timeOut = setTimeout(() => {
        if (sliderPosition.value >= 0) {
            sliderPosition.value = -(itemCount - 1) * 100
            return
        }
        sliderPosition.value += 100
        onAutoPlay()
    }, 250)
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

const onAutoPlay = () => {
    timeInterval = setInterval(() => {
        if (products.value) moveSliderLeft()
    }, 5000)
}

onMounted(() => {
    onObserverElement({
        id,
        callback: fetch,
        condition: products.value === null,
        listener: (entries) => {
            if (entries[0].isIntersecting) {
                onAutoPlay()
            } else {
                clearInterval(timeInterval)
            }
        },
    })

    onUnmounted(() => clearInterval(timeInterval))
})
</script>
<template>
    <div class="w-screen select-none mb-4" :id="id">
        <div class="flex justify-center gap-5 pb-4">
            <div
                class="w-9 h-9 border border-gray-200 bg-white flex items-center justify-center rounded-full button-action"
                @click="moveSliderRight"
            >
                <ClientOnly>
                    <Icon
                        name="ooui:previous-ltr"
                        class="w-3 h-3 text-gray-700"
                    />
                </ClientOnly>
            </div>
            <div
                class="w-9 h-9 border border-gray-200 bg-white flex items-center justify-center rounded-full button-action"
                @click="moveSliderLeft"
            >
                <ClientOnly>
                    <Icon
                        name="ooui:previous-rtl"
                        class="w-3 h-3 text-gray-700"
                /></ClientOnly>
            </div>
        </div>
        <div class="w-full overflow-hidden" :id="`${id}-lazy`">
            <div
                class="flex flex-nowrap w-fit transition-all ease-[cubic-bezier(0.16, 1, 0.29, 0.99)] duration-1000"
                :style="sliderStyle"
            >
                <div class="w-fit flex">
                    <VProduct
                        v-for="product in products"
                        :data="product"
                        :class="{ 'fade-in': products }"
                    />

                    <div v-if="!products" class="flex gap-4 w-full">
                        <VSkeleton />
                        <VSkeleton />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
