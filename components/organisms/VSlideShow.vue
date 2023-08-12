<script setup lang="ts">
import { VButton } from '../atoms'

const sliders = [
    {
        title: {
            t1: 'Online',
            t2: 'Limited Edition',
        },
        description: "So soft, you don't want to take it off.",
        router: '/',
        textButton: 'Shop now',
        url: '/img/JACKET3-1.png',
        animation: 'fade-in',
    },
    {
        title: {
            t1: 'Online2',
            t2: 'Limited Edition',
        },
        description: "So soft, you don't want to take it off.",
        router: '/',
        textButton: 'Shop',
        url: '/img/JACKET3-2.png',
        animation: 'fade-left',
    },
    {
        title: {
            t1: 'Online3',
            t2: 'Limited Edition',
        },
        description: "So soft, you don't want to take it off.",
        router: '/',
        textButton: 'Shop',
        url: '/img/JACKET4-2.png',
        animation: 'fade-right',
    },
    {
        title: {
            t1: 'Online4',
            t2: 'Limited Edition',
        },
        description: "So soft, you don't want to take it off.",
        router: '/',
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

const moveSlider = () => {
    fadeIn.value = false
    fadeOut.value = true
    setTimeout(() => {
        fadeOut.value = false
    }, 1400)
    setTimeout(() => {
        fadeIn.value = true
    })
    setTimeout(() => {
        if (sliderPosition.value >= sliders.length - 1) {
            sliderPosition.value = 0
        } else {
            sliderPosition.value++
        }

        currentSlider.value = sliders[sliderPosition.value]
    }, 500)
}

onMounted(() => {
    let time: NodeJS.Timer
    onObserverElement({
        id: 'slideshow',
        listener: (entries) => {
            if (entries[0].isIntersecting) {
                time = setInterval(() => {
                    moveSlider()
                }, 5000)
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
    <div class="w-screen h-[80vh] overflow-x-hidden flex" id="slideshow">
        <div class="w-fit flex" id="slideshow-lazy">
            <div class="w-screen h-full relative">
                <img
                    :src="currentSlider.url"
                    class="w-full h-full absolute object-cover"
                    :class="sliderImage"
                />
                <div class="p-4 flex justify-center flex-col gap-2 h-full">
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
