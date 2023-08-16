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
const refWidthElement = ref<HTMLDivElement>(null)
const zoomImage = ref(false)
const props = withDefaults(defineProps<Props>(), {
    visible: 1,
})
const { images, visible, onClick, currentIndex } = toRefs(props)
let timeInterval: NodeJS.Timeout
let timeOut: NodeJS.Timeout
const sliderStyle = computed(() => ({
    transform: `translateX(${sliderPosition.value}px)`,
}))
// functions
const moveSliderLeft = async () => {
    clearInterval(timeInterval)
    clearInterval(timeOut)
    let width = 0
    if (refWidthElement.value) {
        width = refWidthElement.value[0].clientWidth
    }
    timeOut = setTimeout(() => {
        if (-sliderPosition.value / width >= images.value.length - 1) {
            sliderPosition.value = 0
            return
        }
        sliderPosition.value -= width
        if (visible.value === 1)
            props.onClick(Math.abs(sliderPosition.value) / width)
        onAutoPlay()
    }, 250)
}

const moveSliderTo = async (index: number) => {
    clearInterval(timeInterval)
    clearInterval(timeOut)
    let width = 0
    if (refWidthElement.value) {
        width = refWidthElement.value[0].clientWidth
    }
    timeOut = setTimeout(() => {
        sliderPosition.value = -index * width
        if (visible.value === 1)
            props.onClick(Math.abs(sliderPosition.value) / width)
        onAutoPlay()
    }, 250)
}

const moveSliderRight = async () => {
    clearInterval(timeInterval)
    clearInterval(timeOut)
    let width = 0
    if (refWidthElement.value) {
        width = refWidthElement.value[0].clientWidth
    }
    timeOut = setTimeout(() => {
        if (sliderPosition.value >= 0) {
            sliderPosition.value = -(images.value.length - 1) * width
            return
        }
        sliderPosition.value += width
        if (visible.value === 1)
            props.onClick(Math.abs(sliderPosition.value) / width)
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
    <div class="lg:w-3/4 m-auto">
        <div
            v-if="zoomImage"
            class="absolute fade-in z-[99] w-screen h-screen top-0 flex items-center justify-center left-0 lg:bg-[#ececec]"
        >
            <span class="absolute top-3 right-5 z-[999]">
                <ClientOnly>
                    <div
                        @click="() => (zoomImage = false)"
                        class="w-9 h-9 bg-white flex shadow items-center justify-center rounded-full button-action"
                    >
                        <Icon
                            name="ic:baseline-zoom-in-map"
                            class="text-gray-700 shadow-sm w-4 h-4"
                        /></div></ClientOnly
            ></span>
            <nuxt-img
                :src="images[currentIndex]"
                alt=""
                class="w-full h-full object-cover lg:object-contain"
            />
        </div>
        <div
            :class="{
                'h-[63vh] md:h-[100vh] lg:h-[80vh] lg:bg-[#ffffffa8]':
                    visible === 1,
                'h-[160px] md:h-[300px] lg:h-[600px]': visible !== 1,
            }"
            class="px-3 flex flex-col gap-2 relative pb-4"
        >
            <div
                class="w-9 h-9 border border-gray-200 bg-white flex items-center justify-center rounded-full button-action absolute-hozi-center left-0 z-20"
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
                class="w-9 h-9 border border-gray-200 bg-white flex items-center justify-center rounded-full button-action absolute-hozi-center right-0 z-20"
                @click="moveSliderLeft"
            >
                <ClientOnly>
                    <Icon
                        name="ooui:previous-rtl"
                        class="w-3 h-3 text-gray-700"
                /></ClientOnly>
            </div>

            <div class="w-full h-full flex-1 overflow-hidden">
                <div>
                    <span
                        v-if="visible === 1"
                        class="absolute z-20 top-3 right-5"
                    >
                        <ClientOnly>
                            <div
                                @click="() => (zoomImage = true)"
                                class="w-9 h-9 bg-white flex shadow items-center justify-center rounded-full button-action"
                            >
                                <Icon
                                    name="material-symbols:zoom-out-map"
                                    class="text-gray-700 shadow-sm w-4 h-4"
                                /></div></ClientOnly
                    ></span>
                </div>
                <div
                    class="flex flex-nowrap w-fit h-full transition-all ease-[cubic-bezier(0.16, 1, 0.29, 0.99)] duration-1000"
                    :style="sliderStyle"
                >
                    <div class="flex w-fit h-full">
                        <div
                            class="flex h-full"
                            :class="{
                                'w-[100vw] lg:w-[calc((100vw/4)*3)]':
                                    visible === 1,
                                'w-[50vw] lg:w-[calc((50vw/4)*3)] px-1':
                                    visible === 2,
                                'w-[33vw] lg:w-[calc((33vw/4)*3)] px-1':
                                    visible === 3,
                                'w-[25vw]  lg:w-[calc((25vw/4)*3)] px-1':
                                    visible === 4,
                                'w-[20vw]  lg:w-[calc((20vw/4)*3)] px-1':
                                    visible === 5,
                            }"
                            ref="refWidthElement"
                            v-for="(image, index) in images"
                            @click="() => visible !== 1 && onClick(index)"
                        >
                            <nuxt-img
                                :src="image"
                                :data="image"
                                class="w-full h-full rounded-md object-cover object-top"
                                :class="{
                                    'fade-in': images,
                                    'border border-black transition-all ease-linear duration-500':
                                        visible != 1 && currentIndex === index,
                                    'lg:object-contain': visible === 1,
                                }"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
