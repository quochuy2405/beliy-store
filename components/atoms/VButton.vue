<script setup lang="ts">
interface Props {
    title?: string
    href?: string
    mode?: 'default' | 'primary' | 'dark'
    outline?: boolean
    class?: string
    wFull?: boolean
    disabled?: boolean
    animation?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    animation: false,
    mode: 'default',
    disabled: false,
})

const { animation, href, outline, wFull, disabled } = toRefs(props)

const className = reactive({
    'bg-gradient-to-r from-cyan-500 to-blue-500 text-white':
        props.mode === 'primary',
    'bg-gradient-to-r from-gray-500 to-black-500': props.mode === 'dark',
    '!bg-transparent text-white': !!outline.value,
    [props.class || '']: props.class,
})
</script>

<template>
    <NuxtLink :to="href" :class="{ 'w-full': wFull }">
        <button
            v-bind="props"
            :disabled="disabled"
            class="py-2 px-5 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-black rounded-md focus:z-10 focus:ring-2 focus:ring-gray-200 w-full button-action relative overflow-hidden disabled:!opacity-90"
            :class="className"
        >
            <span v-if="animation" class="button-wait-tap"></span>
            <slot></slot>
        </button>
    </NuxtLink>
</template>
