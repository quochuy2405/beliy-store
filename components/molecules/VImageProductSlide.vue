<script setup lang="ts">
defineOptions({
    inheritAttrs: false,
})

interface Props {
    images: string[]
    visible?: number
    currentIndex?: number
    onClick?: (index: number) => void
}
// variables
const sliderPosition = ref(0)
const props = withDefaults(defineProps<Props>(), {
    visible: 1,
})
const { images, visible, onClick, currentIndex } = toRefs(props)
let timeInterval: NodeJS.Timeout
let timeOut: NodeJS.Timeout
const sliderStyle = computed(() => ({
    transform: `translateX(calc(${sliderPosition.value}vw/${visible.value})`,
}))
// functions
const moveSliderLeft = async () => {
    clearInterval(timeInterval)
    clearInterval(timeOut)
    timeOut = setTimeout(() => {
        if (-sliderPosition.value / 100 >= images.value.length - 1) {
            sliderPosition.value = 0
            return
        }
        sliderPosition.value -= 100
        if (visible.value === 1)
            props.onClick(Math.abs(sliderPosition.value) / 100)
        onAutoPlay()
    }, 250)
}

const moveSliderTo = async (index: number) => {
    clearInterval(timeInterval)
    clearInterval(timeOut)
    timeOut = setTimeout(() => {
        sliderPosition.value = -index * 100

        onAutoPlay()
    }, 250)
}

const moveSliderRight = async () => {
    clearInterval(timeInterval)
    clearInterval(timeOut)
    timeOut = setTimeout(() => {
        if (sliderPosition.value >= 0) {
            sliderPosition.value = -(images.value.length - 1) * 100
            return
        }
        sliderPosition.value += 100
        if (visible.value === 1)
            props.onClick(Math.abs(sliderPosition.value) / 100)
        onAutoPlay()
    }, 250)
}

const onAutoPlay = () => {
    timeInterval = setInterval(() => {
        if (images) moveSliderLeft()
    }, 5000)
}

watch(currentIndex, () => {
    if (visible.value === 1) {
        moveSliderTo(currentIndex.value)
    }
})
</script>

<template>
    <div
        :class="{
            'h-[63vh]': visible === 1,
            'h-[160px]': visible !== 1,
        }"
        class="px-3 flex w-full flex-col gap-2 relative pb-4"
    >
        <div
            class="w-9 h-9 border border-gray-200 bg-white flex items-center justify-center rounded-full button-action absolute-hozi-center left-0 z-20"
            @click="moveSliderRight"
        >
            <ClientOnly>
                <Icon name="ooui:previous-ltr" class="w-3 h-3 text-gray-700" />
            </ClientOnly>
        </div>
        <div
            class="w-9 h-9 border border-gray-200 bg-white flex items-center justify-center rounded-full button-action absolute-hozi-center right-0 z-20"
            @click="moveSliderLeft"
        >
            <ClientOnly>
                <Icon name="ooui:previous-rtl" class="w-3 h-3 text-gray-700"
            /></ClientOnly>
        </div>

        <div class="w-full h-full overflow-hidden">
            <div
                class="flex flex-nowrap w-fit h-full transition-all ease-[cubic-bezier(0.16, 1, 0.29, 0.99)] duration-1000"
                :style="sliderStyle"
            >
                <div class="flex w-fit h-ful">
                    <div
                        class="flex h-full"
                        :class="{
                            'w-[100vw]': visible === 1,
                            'w-[50vw] px-1': visible === 2,
                            'w-[33vw] px-1': visible === 3,
                            'w-[25vw] px-1': visible === 4,
                        }"
                        v-for="(image, index) in images"
                        @click="() => visible !== 1 && onClick(index)"
                    >
                        <img
                            :src="image"
                            :data="image"
                            class="w-full h-full rounded-md object-cover object-top"
                            :class="{
                                'fade-in': images,
                                'border border-black transition-all ease-linear duration-500':
                                    visible != 1 && currentIndex === index,
                            }"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
