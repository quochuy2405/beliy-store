<script setup lang="ts">
import { VButton } from '../atoms'

const sliders = [
    {
        title: {
            t1: 'Online',
            t2: 'Limited Edition',
        },
        description: "So soft, you don't want to take it off.",
        router: '/products',
        textButton: 'Shop now',
        url: '/img/JACKET3-1.png',
        animation: 'fade-in',
    },
    {
        title: {
            t1: 'For Men',
            t2: 'Limited Edition',
        },
        description: "So soft, you don't want to take it off.",
        router: '/formen',
        textButton: 'Shop',
        url: '/img/JACKET3-2.png',
        animation: 'fade-left',
    },
    {
        title: {
            t1: 'For Women',
            t2: 'Limited Edition',
        },
        description: "So soft, you don't want to take it off.",
        router: '/forwoman',
        textButton: 'Shop',
        url: '/img/JACKET4-2.png',
        animation: 'fade-right',
    },
    {
        title: {
            t1: "Let's go",
            t2: 'Limited Edition',
        },
        description: "So soft, you don't want to take it off.",
        router: '/products',
        textButton: 'Shop',
        url: '/img/JACKET4-1.png',
        animation: 'fade-bottom',
    },
]

const sliderPosition = ref(0)
const fadeIn = ref(true)
const fadeOut = ref(false)
const currentSlider = ref(sliders[0])

const sliderClass = computed(() => ({
    [currentSlider.value.animation]: fadeIn.value,
}))
const sliderImage = computed(() => ({
    'fade-in': fadeIn.value,
    'fade-out': fadeOut.value,
}))

const moveSlider = async () => {
    if (sliderPosition.value >= sliders.length - 1) {
        sliderPosition.value = 0
    } else {
        sliderPosition.value++
    }
    fadeIn.value = false
    fadeOut.value = true
    await setTimeout(() => {
        currentSlider.value = sliders[sliderPosition.value]
        fadeIn.value = true
        fadeOut.value = false
    }, 500)
}

onMounted(() => {
    let time: NodeJS.Timer
    onObserverElement({
        id: 'slideshow',
        listener: (entries) => {
            if (entries[0].isIntersecting) {
                time = setInterval(async () => {
                    await moveSlider()
                }, 4000)
            } else {
                clearInterval(time)
            }
        },
    })

    onUnmounted(() => {
        clearInterval(time) // Clear the interval when the component is unmounted
    })
})
</script>
<template>
    <div
        class="w-screen h-[80vh] overflow-hidden flex lg:bg-[#ececec]"
        id="slideshow"
    >
        <div class="w-full flex" id="slideshow-lazy">
            <div class="w-screen h-full relative">
                <nuxt-img
                    :src="currentSlider.url"
                    class="w-full h-full absolute object-cover lg:object-contain lg:w-2/4 lg:right-0"
                    :class="sliderImage"
                    alt="beliy"
                />
                <div
                    class="p-4 flex justify-center flex-col gap-2 h-full lg:p-[20%]"
                >
                    <div class="text-4xl font-medium">
                        <h1 :class="sliderClass">
                            {{ currentSlider.title.t1 }}
                        </h1>
                        <h1 :class="sliderClass" style="animation-delay: 0.6s">
                            {{ currentSlider.title.t2 }}
                        </h1>
                    </div>
                    <p
                        class="font-medium"
                        :class="sliderClass"
                        style="animation-delay: 0.9s"
                    >
                        {{ currentSlider.description }}
                    </p>
                    <div
                        :class="sliderClass"
                        style="animation-delay: 1.2s"
                        class="mt-4"
                    >
                        <VButton
                            :href="currentSlider.router"
                            type="submit"
                            mode="default"
                            class="!bg-[#111111] !rounded-full text-white !w-fit !py-3 px-10 min-w-[160px] uppercase"
                            animation
                        >
                            {{ currentSlider.textButton }}
                        </VButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.slider-container {
    display: flex;
    transition: transform 0.3s ease-in-out;
}
</style>
