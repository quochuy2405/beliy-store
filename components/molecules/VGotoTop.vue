<script setup lang="ts">
// variables
const positon = ref(0)
// functions
const gotoTop = () => {
    const body = document.querySelector('body')
    body.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
    const body = document.querySelector('body')
    body.addEventListener('scroll', () => onScroll())

    const onScroll = () => {
        const winScroll = body.scrollTop || document.documentElement.scrollTop
        const height = body.scrollHeight - body.clientHeight
        const scrolled = (winScroll / height) * 100
        positon.value = scrolled
        document.getElementById('bar').style.height = scrolled + '%'
    }
})
</script>
<template>
    <div
        class="w-9 h-9 absolute bottom-28 shadow-md bg-white z-[29] flex items-center justify-center right-10 rounded-full overflow-hidden button-action transition-all ease-linear duration-300"
        @click="gotoTop"
        :class="{
            'scale-0 opacity-0': positon < 8,
            'scale-100 opacity-1': positon >= 8,
        }"
    >
        <span
            class="mix-blend-difference bg-black text-white shadow-md absolute-center z-[20]"
        >
            <ClientOnly
                ><Icon
                    name="solar:arrow-to-top-left-bold"
                    class="w-4 h-4" /></ClientOnly
        ></span>

        <span id="bar" class="w-full bg-black absolute bottom-0 z-10"></span>
    </div>
</template>
