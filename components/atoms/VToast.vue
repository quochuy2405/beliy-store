<script setup lang="ts">
import { initToastValue, useToast } from '@/stores/nuxtStore'

const toast = useToast()
let time: NodeJS.Timer
let timeReset: NodeJS.Timer
watch(toast, () => {
    clearTimeout(time)
    clearTimeout(timeReset)

    time = setTimeout(() => {
        toast.isShow = false
        setTimeout(() => {
            toast.$state = initToastValue
        }, 800)
    }, 3000)
})
</script>

<template>
    <div
        class="absolute flex items-center justify-center shadow-lg px-4 py-1 transition-all ease-linear rounded-full border border-gray-100 z-[99999]"
        v-if="toast.$state.content && toast.$state.isShow !== 'clear'"
        :class="{
            'top-20 lg:bottom-28 lg:top-[unset]':
                toast.$state.horizontal === 'top',
            'bottom-28 ': toast.$state.horizontal === 'bottom',
            'left-30': toast.$state.vertical === 'left',
            'absolute-vertical-center ': toast.$state.vertical === 'center',
            'right-8': toast.$state.vertical === 'right',
            'fade-in': toast.$state.isShow === true,
            'fade-out': toast.$state.isShow === false,
            'bg-gray-800 text-white': toast.$state.status === 'success',
            'bg-red-400 text-white': toast.$state.status === 'error',
            'bg-orange-400 text-white': toast.$state.status === 'warning',
            'bg-white text-black': toast.$state.status === 'info',
        }"
    >
        <p class="text-xs font-semibold">{{ toast.$state.content }}</p>
    </div>
</template>
