<script setup lang="ts">
import { VButton } from '@/components/atoms'
import { VProductSider, VSlideShow } from '@/components/organisms'

definePageMeta({
    layout: 'default',
    layoutTransition: {
        name: 'layout',
    },
})
onMounted(() => {
    const body = document.querySelector('body')
    body.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>
<template>
    <div>
        <VSlideShow />
        <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-10 lg:w-4/5 m-auto"
        >
            <div
                class="w-full h-[40vh] lg:!h-[70vh] first:h-[64vh] last:h-[64vh] m-auto overflow-x-hidden flex relative mt-1 flex-col justify-end md:w-full md:!h-[40vh] md:last:col-span-2 lg:last:col-span-1"
                v-for="i in [5, 3, 4]"
            >
                <nuxt-img
                    :src="`/img/JK${i}.png`"
                    alt="beliy"
                    class="w-full h-full object-cover absolute"
                />
                <div
                    class="flex flex-col justify-end items-center p-4 h-full w-full z-10"
                >
                    <VButton
                        href="/products"
                        type="submit"
                        mode="default"
                        class="!bg-white !rounded-full !text-black !font-semibold !w-fit !py-3 px-10 z-10"
                    >
                        Shop clothing
                    </VButton>
                </div>
            </div>
        </div>

        <div class="flex items-center justify-center p-4 flex-col gap-2">
            <h1 class="heading">Trending Products</h1>
            <p class="text-center">
                Here’s some of our most popular products people are in love
                with.
            </p>
        </div>
        <VProductSider id="trending" :visible="5" />

        <div class="flex items-center justify-center p-4 flex-col gap-2">
            <h1 class="heading">You Must Have</h1>
            <p class="text-center">
                Find the top most popular items in Umino best sellers.
            </p>
        </div>

        <VProductSider id="must" :visible="5" />
        <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="flex px-3 flex-col gap-1 mb-3">
                <nuxt-img
                    src="/img/JK1.png"
                    class="w-full h-full object-cover"
                    alt="beliy"
                />
                <h1 class="text-xl font-semibold">Sản Phẩm Độc Quyền</h1>
                <NuxtLink href="/products" class="link">Xem ngay</NuxtLink>
            </div>
            <div class="flex px-3 flex-1 flex-col gap-1 mb-3">
                <nuxt-img
                    src="/img/JK2.png"
                    class="w-full h-full object-cover"
                    alt="beliy"
                />
                <h1 class="text-xl font-semibold">Phối đặc sắc</h1>
                <NuxtLink href="/products" class="link">Xem ngay</NuxtLink>
            </div>
            <div class="flex px-3 flex-1 flex-col gap-1 mb-3">
                <nuxt-img
                    src="/img/JK1.png"
                    class="w-full h-full object-cover"
                    alt="beliy"
                />
                <h1 class="text-xl font-semibold">Dành cho bạn</h1>
                <NuxtLink href="/products" class="link">Xem ngay</NuxtLink>
            </div>
        </div>
        <div class="flex items-center justify-center p-4 flex-col gap-2">
            <h1 class="heading text-center uppercase">
                Hãy đồng hành cùng Beliy nhé
            </h1>
            <p class="text-center">
                Find the top most popular items in Umino best sellers.
            </p>
        </div>

        <div
            class="flex h-56 lg:h-[70vh] overflow-hidden px-3 flex-col gap-1 mb-3"
        >
            <nuxt-img
                src="/img/JK3.png"
                class="w-full h-full object-contain"
                alt="beliy"
            />
        </div>
    </div>
</template>
