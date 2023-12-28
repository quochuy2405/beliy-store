<script setup lang="ts">
import { VToast } from '@/components/atoms'
import { VGotoTop } from '@/components/molecules'
import { VFooter, VHeader } from '@/components/organisms'
const maintenance = false
</script>
<template>
    <div>
        <div v-if="!maintenance">
            <VToast />
            <VHeader />
            <VGotoTop />

            <slot></slot>

            <VFooter />
        </div>
        <div
            v-if="maintenance"
            class="flex items-center justify-center h-screen w-screen flex-col"
        >
            <nuxt-img
                src="/img/maintenance.png"
                class="w-20 h-20"
                alt="beliy"
            />
            <h2>☹️ Chủ bận đi làm...</h2>
            <h1 class="font-semibold">Beliy sẽ không quay lại nữa.🤗</h1>
        </div>
    </div>
</template>
