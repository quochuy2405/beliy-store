<script setup lang="ts">
import { VButton } from '@/components/atoms'
definePageMeta({
    layoutTransition: {
        name: 'layout',
    },
    layout: 'slot',
})

const onLogin = () => {
    console.log('on login')
}

onMounted(() => {
    const body = document.querySelector('body')
    body.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>
<template>
    <Suspense>
        <template>
            <div class="h-screen w-screen bg-black text-white">
                <div
                    class="w-full h-full flex justify-between flex-col px-4 py-20 m-auto max-w-xl lg:max-w-none lg:flex-row lg:w-4/5"
                >
                    <div
                        class="lg:flex-1 lg:justify-center lg:flex lg:flex-col"
                    >
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
                        <div class="flex gap-2 flex-col">
                            <h1 class="font-bold text-2xl">
                                Welcome, let's create an account
                            </h1>
                            <h2 class="text-sm font-medium text-[#949494]">
                                Revolutionizing design with generative AI—Maket
                                empowers architects, interior designers,
                                builders, contractors, and developers to
                                generate floorplans, navigate zoning codes, and
                                explore limitless styles
                            </h2>
                        </div>
                        <VButton
                            mode="primary"
                            :onclick="onLogin"
                            class="flex gap-2 items-center justify-center hover:shadow-[0_0_130px_#54E6F8] transition-all duration-400 ease-in-out"
                        >
                            <Icon
                                class="w-6 h-6"
                                name="ph:envelope"
                                color="white"
                            />
                            <span>Sign up with email</span>
                        </VButton>
                        <VButton
                            href="/"
                            outline
                            class="flex gap-2 justify-center items-center hover:shadow-[0_0_130px_#54E6F8] transition-all duration-400 ease-linear"
                        >
                            <Icon
                                class="w-6 h-6"
                                name="mingcute:google-fill"
                                color="white"
                            />
                            <span>Sign up with Google</span>
                        </VButton>
                        <p class="text-sm text-center">
                            Already registered ?
                            <NuxtLink
                                href="/register"
                                class="underline cursor-pointer"
                                >Sign in</NuxtLink
                            >
                        </p>
                    </div>
                </div>
            </div>
        </template>
    </Suspense>
</template>
