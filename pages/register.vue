<script setup lang="ts">
import { Register } from '@/components/templates'
import { useVuelidate } from '@vuelidate/core'
import { rules } from '@/resolvers/register.rule'
import { VButton, VTextField } from '@/components/atoms'
export interface RegisterForm {
    email: string
    password: string
    confirmPassword: string
}
definePageMeta({
    layoutTransition: {
        name: 'layout',
    },
    layout: 'slot',
})
onMounted(() => {
    const body = document.querySelector('body')
    body.scrollTo({ top: 0, behavior: 'smooth' })
})
const formData = reactive<RegisterForm>({
    email: '',
    password: '',
    confirmPassword: null,
})

const control = useVuelidate(rules(formData), formData)

const submitForm = () => {
    control.value.$validate()
    if (!control.value.$error) {
        //    Some code
    }
}
</script>
<template>
    <div class="h-screen w-screen bg-black text-white">
        <div
            class="w-full h-full flex justify-between flex-col px-4 py-20 m-auto max-w-xl lg:max-w-none lg:flex-row lg:w-4/5"
        >
            <div class="lg:flex-1 lg:justify-center lg:flex lg:flex-col">
                <div class="pb-14 gap-8 flex flex-col">
                    <div class="h-36 w-fit">
                        <img
                            src="@/assets/svg/logo.svg"
                            class="w-full h-full"
                            alt="Logo"
                        />
                    </div>
                    <h1 class="font-bold text-2xl">
                        Design faster and plan to scale.
                    </h1>
                </div>
            </div>
            <div
                class="flex flex-col gap-4 lg:flex-1 lg:justify-center lg:flex lg:flex-col"
            >
                <div class="flex gap-2 flex-col items-center w-full">
                    <h1 class="font-bold text-2xl">Welcome to Maket</h1>
                    <p class="text-sm">
                        Don't have an account ?
                        <NuxtLink class="underline cursor-pointer"
                            >Click here</NuxtLink
                        >
                    </p>
                    <form
                        @submit.prevent="submitForm"
                        class="w-full md:w-2/3 m-auto"
                    >
                        <VTextField
                            title="Email"
                            name="email"
                            v-model="formData.email"
                            :control="control.email"
                        />

                        <VTextField
                            title="Password"
                            name="password"
                            v-model="formData.password"
                            :control="control.password"
                        />

                        <VTextField
                            title="Confirm Password"
                            name="confirmPassword"
                            v-model="formData.confirmPassword"
                            :control="control.confirmPassword"
                        />

                        <VButton
                            type="submit"
                            mode="primary"
                            class="mt-4"
                            wFull
                        >
                            Submit
                        </VButton>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
