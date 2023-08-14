<script setup lang="ts">
import { useCart } from '@/stores/nuxtStore'
import { storeToRefs } from 'pinia'

definePageMeta({
    layoutTransition: {
        name: 'layout',
    },
    layout: 'slot',
})
const checkoutId = useCookie('checkoutId')
const dataOrder = useCookie<{ discount: string; note: string }>('dataOrder')
const { products } = storeToRefs(useCart())
const router = useRouter()
onMounted(() => {
    const body = document.querySelector('body')
    body.scrollTo({ top: 0, behavior: 'smooth' })
})

const resetAllData = () => {
    checkoutId.value = null
    dataOrder.value = null
    products.value = []
    window.localStorage.setItem('cartProducts', null)
    router.push({ path: '/' })
    history.pushState(null, null, document.URL)
}
</script>
<template>
    <div class="bg-white h-screen w-full flex items-center">
        <div class="p-6 md:mx-auto rounded-3xl">
            <div class="w-20 h-20 m-auto">
                <svg viewBox="0 0 24 24">
                    <path
                        fill="#42d392"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                    />
                </svg>
            </div>
            <div class="text-center">
                <h3
                    class="md:text-2xl text-base text-gray-900 font-semibold text-center"
                >
                    Đã tiếp nhận đơn hàng!
                </h3>
                <p class="text-gray-600 my-2">
                    Cảm ơn bạn đã sử dụng các sản phẩm tại Beliy Stresswear.
                </p>
                <p>Chúc bạn một ngày mới thật bùng lổ!</p>
                <div class="py-10 text-center">
                    <p
                        @click="resetAllData"
                        class="w-36 mx-auto mt-3 flex gap-1 justify-center items-center text-sm rounded-md bg-black py-2 font-medium text-blue-50 hover:bg-gray-700"
                    >
                        Về trang chủ
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
