<script setup lang="ts">
import { useCart } from '@/stores/nuxtStore'
import { VCartItem } from '@/components/molecules'
import { storeToRefs } from 'pinia'
const tabs = [
    {
        label: 'Home',
        router: '/',
    },
    {
        label: 'Home',
        router: '/',
    },
]
const scrollPosition = ref(0)
const router = useRouter()
const classTopHeader = computed(() => ({
    'fade-bottom fixed w-full top-0': !!scrollPosition.value,
}))
const { products } = storeToRefs(useCart())
const gotoProductPage = () => {
    router.push({ path: '/products' })
}

onMounted(() => {
    const body = document.querySelector('body')

    body.addEventListener('scroll', () => {
        setTimeout(() => {
            scrollPosition.value = body.scrollTop
        }, 200)
    })
})
</script>
<template>
    <div class="h-16">
        <header class="shadow-sm z-30 bg-white" :class="classTopHeader">
            <input id="hamburger" type="checkbox" class="hidden" checked />
            <div class="w-full h-9 bg-black px-6 hidden"></div>
            <div class="w-full h-16 flex items-center px-6 justify-between">
                <NuxtLink href="https://www.facebook.com/beliystores">
                    <ClientOnly>
                        <Icon
                            name="logos:facebook"
                            class="h-6 w-6 font-semibold"
                        /> </ClientOnly
                ></NuxtLink>

                <NuxtLink href="/" class="w-16 h-10">
                    <img src="@/assets/svg/logo.svg" />
                </NuxtLink>
                <div class="hidden">
                    <NuxtLink
                        v-for="tab in tabs"
                        :key="tab.router + tab.label"
                        :to="tab.router"
                        target="_blank"
                    >
                        {{ tab.label }}
                    </NuxtLink>
                </div>
                <div>
                    <label for="hamburger">
                        <div class="w-fit h-fit relative">
                            <span
                                class="bg-red-600 text-[9px] font-semibold text-white w-4 h-4 absolute flex items-center justify-center rounded-full -right-1/3 font-did"
                                >{{ products.length || 0 }}</span
                            >
                            <ClientOnly>
                                <Icon
                                    name="iconoir:simple-cart"
                                    class="h-6 w-6"
                                />
                            </ClientOnly></div
                    ></label>
                </div>
            </div>
            <aside
                id="bar-mobile"
                class="z-[9999] h-screen w-screen absolute top-0 left-0 md:w-[50%] flex-shrink-0 overflow-y-auto bg-white md:block lg:hidden shadow-lg pt-10"
            >
                <h1 class="font-medium text-lg uppercase px-4 text-black">
                    Giỏ hàng của bạn
                </h1>
                <label for="hamburger" class="absolute top-3 right-3">
                    <ClientOnly
                        ><Icon
                            name="material-symbols:close-rounded"
                            class="w-6 h-6"
                    /></ClientOnly>
                </label>
                <div class="text-gray-500">
                    <div>
                        <VCartItem v-for="item in products" :data="item" />
                    </div>
                    <div
                        v-if="!products.length"
                        class="flex items-center flex-col gap-3 mt-[20%]"
                    >
                        <ClientOnly>
                            <Icon
                                name="solar:bag-5-broken"
                                class="w-20 h-20 text-gray-200"
                            />
                        </ClientOnly>
                        <div class="flex items-center flex-col gap-2">
                            <h2 class="text-xl font-normal">Giỏ hàng rỗng</h2>
                            <p class="text-sm w-2/3 m-auto text-center">
                                Bạn có thể xem tất cả sản phẩm và mua nó ở trang
                                shop
                            </p>
                        </div>
                        <label for="hamburger">
                            <div
                                @click="gotoProductPage"
                                class="py-3 m-auto mt-5 rounded-full w-fit px-10 text-sm uppercase font-medium text-white focus:outline-none bg-black focus:z-10 focus:ring-2 focus:ring-gray-200 button-action relative overflow-hidden"
                            >
                                <span class="button-wait-tap"></span>
                                <p>Go to shop</p>
                            </div>
                        </label>
                    </div>
                </div>
            </aside>
        </header>
        <div class="absolute bottom-0 w-full z-50">
            <div
                class="w-5/6 m-auto h-12 bg-white rounded-full z-30 flex justify-evenly items-center"
            >
                <NuxtLink href="/" class="flex flex-col items-center">
                    <Icon name="solar:home-2-broken" class="w-5 h-5" />
                    <p class="text-xs font-medium">Home</p>
                </NuxtLink>
                <NuxtLink href="/products" class="flex flex-col items-center">
                    <Icon name="solar:shop-broken" class="w-5 h-5" />
                    <p class="text-xs font-medium">Shop</p>
                </NuxtLink>
                <NuxtLink href="/formen" class="flex flex-col items-center">
                    <Icon name="solar:men-broken" class="w-5 h-5" />
                    <p class="text-xs font-medium">Men</p>
                </NuxtLink>
                <NuxtLink href="/forwoman" class="flex flex-col items-center">
                    <Icon name="solar:women-broken" class="w-5 h-5" />
                    <p class="text-xs font-medium">Woman</p>
                </NuxtLink>
                <NuxtLink href="/info" class="flex flex-col items-center">
                    <Icon name="solar:info-square-broken" class="w-5 h-5" />
                    <p class="text-xs font-medium">Info</p>
                </NuxtLink>
            </div>
            <div
                class="h-5 w-5/6 m-auto bg-white rounded-tr-full rounded-tl-full mt-5"
            ></div>
        </div>
    </div>
</template>
