<script setup lang="ts">
const isOpen = useState('modalControl')
const isTransitionOpen = ref(false)
let timeId: NodeJS.Timer
let timeCloseId: NodeJS.Timer
const onClose = () => {
    clearTimeout(timeCloseId)
    timeCloseId = setTimeout(() => {
        isOpen.value = false
    }, 100)
}
watch(isOpen, () => {
    clearTimeout(timeId)
    if (!!isOpen.value) {
        timeId = setTimeout(() => {
            isTransitionOpen.value = true
        }, 100)
    } else {
        timeId = setTimeout(() => {
            isTransitionOpen.value = false
        }, 100)
    }
})
</script>
<template>
    <div>
        <span
            @click="onClose"
            class="bg-gray-50 absolute top-0 z-20 h-screen w-screen transition-all ease-in-out duration-200"
            :class="{
                'translate-y-0 opacity-50': isTransitionOpen,
                'translate-y-full opacity-0': !isTransitionOpen,
            }"
        ></span>
        <div
            class="min-h-[60vh] w-screen fixed bottom-0 z-50 rounded-ss-xl rounded-se-xl p-4 bg-white shadow-lg border transition-transform ease-in-out duration-200"
            :class="{
                'translate-y-0': isTransitionOpen,
                'translate-y-full': !isTransitionOpen,
            }"
        >
            <div @click="onClose" class="flex justify-end">
                <ClientOnly
                    ><Icon
                        name="material-symbols:close-rounded"
                        class="w-6 h-6"
                /></ClientOnly>
            </div>
            <div class="flex flex-1 overflow-y-auto py-2">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
