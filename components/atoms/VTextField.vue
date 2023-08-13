<script setup lang="ts">
interface Props {
    modelValue?: string
    class?: string
    control?: any
    name: string
    title?: string
    change?: any
    value?: any
}

const { title, control, change, name, modelValue, value, ...props } =
    withDefaults(defineProps<Props>(), {})
const className = computed(() => ({
    'border-red-500 focus:border-red-500': control?.$error,
    'border-[#42d392]': !control?.$invalid,
    [props.class]: !!props.class,
}))

const emit = defineEmits(['update:modelValue'])
const updateValue = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
    <!-- Some code -->
    <div class="relative pb-1 mb-4 h-fit w-full">
        <label :v-if="!!title" for="email" class="text-sm leading-7">{{
            title
        }}</label>
        <div class="relative flex items-center">
            <input
                type="text"
                :name="name"
                placeholder="e.g. example@email.com"
                class="input-default"
                :class="className"
                @input="updateValue"
                :value="value"
            />
            <!-- The icon is going to render but the name of the icon it will depend on the validation output and the color as well -->
            <Icon
                :v-if="!control?.$invalid || !!control?.$error"
                class="absolute hidden h-4 w-4 right-2 text-xl text-green-500"
                :class="{
                    'text-green-500': !control?.$invalid,
                    'text-yellow-500': control?.$error,
                    '!hidden': !!control?.$invalid && !control?.$error,
                }"
                :name="`heroicons-solid:${
                    !control?.$error ? 'check-circle' : 'exclamation'
                }`"
            />
        </div>
        <span
            class="absolute bottom-0 text-xs text-red-500 translate-y-[100%]"
            v-if="control.$error"
            >{{ control.$errors[0].$message }}</span
        >
    </div>

    <!-- Some code -->
</template>
