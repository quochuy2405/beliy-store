<script setup lang="ts">
import { OptionType } from '@/types/common'

interface Props {
    options: Array<OptionType>
    value: OptionType | null
    title: string
    control?: any
    change: (value: OptionType) => void
    required?: boolean
    disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    required: false,
    disabled: false,
})
const { title, control, required, disabled } = toRefs(props)

const isOpen = ref(false)
const selectBoxRef = ref(null)

const isSelected = (opt: OptionType) => {
    if (!props.value) return false
    return opt.value === props.value.value
}

const openDropdown = () => (isOpen.value = true)

const select = (value: OptionType) => {
    isOpen.value = false
    props.change(value)
}
const handleOutsideClick = (event) => {
    if (!selectBoxRef.value.contains(event.target)) {
        isOpen.value = false
    }
}
onMounted(() => {
    window.addEventListener('click', handleOutsideClick)
})
onUnmounted(() => {
    window.removeEventListener('click', handleOutsideClick)
})
</script>

<template>
    <div class="mb-4 relative">
        <label id="listbox-label" class="text-sm leading-7">
            {{ title }}
        </label>

        <div class="relative" ref="selectBoxRef">
            <span class="inline-block w-full rounded-md">
                <button
                    type="button"
                    @click="openDropdown"
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    aria-labelledby="listbox-label"
                    class="cursor-pointer relative w-full rounded-full border border-gray-700 bg-white pl-3 pr-10 py-2.5 text-left focus:outline-none focus:shadow-outline-blue focus:border-green-400 transition ease-in-out duration-150 sm:text-sm sm:leading-5 disabled:opacity-30"
                    :disabled="disabled"
                    :class="{
                        'border-red-500': !!required && control?.$errors[0],
                    }"
                >
                    <div
                        class="flex items-center text-base space-x-3"
                        v-if="props.value"
                    >
                        <span class="block truncate">{{
                            props.value.label
                        }}</span>
                    </div>
                    <div
                        class="flex items-center space-x-3"
                        v-if="!props.value"
                    >
                        <span class="block truncate">Hãy chọn</span>
                    </div>
                    <span
                        class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                    >
                        <svg
                            class="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </span>
                </button>
            </span>

            <div
                v-show="isOpen"
                class="absolute mt-1 w-full rounded-md bg-white shadow-lg z-30 border border-gray-200"
            >
                <ul
                    tabindex="-1"
                    role="listbox"
                    aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-item-3"
                    class="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                >
                    <!-- Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation. -->
                    <li
                        tabindex="0"
                        @click="select(item)"
                        :id="`select-${item}`"
                        role="option"
                        v-for="item in props.options"
                        :key="item.value"
                        class="text-gray-900 select-none relative py-2 pl-3 pr-9 cursor-pointer hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600"
                    >
                        <div class="flex items-center space-x-3">
                            <span
                                class="block truncate"
                                :class="{
                                    'font-normal': !isSelected(item),
                                    'font-semibold': isSelected(item),
                                }"
                            >
                                {{ item.label }}
                            </span>
                        </div>

                        <span
                            v-show="isSelected(item)"
                            class="absolute inset-y-0 right-0 flex items-center pr-4"
                        >
                            <svg
                                class="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <span
            class="absolute -bottom-1 text-xs text-red-500 translate-y-[100%]"
            v-if="!!required && control?.$errors[0]"
            >{{ control.$errors[0].$message }}</span
        >
    </div>
</template>
