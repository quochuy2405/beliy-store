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
            class="w-screen h-[60vh] overflow-x-hidden flex relative mt-1 flex-col justify-end"
        >
            <img
                src="/img/JACKET4-1.png"
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

        <div class="flex items-center justify-center p-4 flex-col gap-2">
            <h1 class="heading">Trending Products</h1>
            <p class="text-center">
                Here’s some of our most popular products people are in love
                with.
            </p>
        </div>
        <VProductSider id="trending" />
        <div class="flex px-3 flex-col gap-1 mb-3">
            <img src="/img/JACKET3-1.png" />
            <h1 class="text-xl font-semibold">Sản Phẩm Độc Quyền</h1>
            <NuxtLink href="/products" class="link">Xem ngay</NuxtLink>
        </div>
        <div class="flex items-center justify-center p-4 flex-col gap-2">
            <h1 class="heading">You Must Have</h1>
            <p class="text-center">
                Find the top most popular items in Umino best sellers.
            </p>
        </div>

        <VProductSider id="must" />
        <div class="flex px-3 flex-col gap-1 mb-3">
            <img src="/img/JACKET3-1.png" />
            <h1 class="text-xl font-semibold">Phối đặc sắc</h1>
            <NuxtLink href="/products" class="link">Xem ngay</NuxtLink>
        </div>
        <div class="flex px-3 flex-col gap-1 mb-3">
            <img src="/img/JACKET3-1.png" />
            <h1 class="text-xl font-semibold">Dành cho bạn</h1>
            <NuxtLink href="/products" class="link">Xem ngay</NuxtLink>
        </div>
        <div class="flex items-center justify-center p-4 flex-col gap-2">
            <h1 class="heading text-center uppercase">
                Hãy đồng hành cùng Beliy nhé
            </h1>
            <p class="text-center">
                Find the top most popular items in Umino best sellers.
            </p>
        </div>

        <div class="flex h-48 overflow-hidden px-3 flex-col gap-1 mb-3">
            <img src="/img/JACKET3-1.png" />
        </div>
    </div>
</template>
