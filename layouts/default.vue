<script setup lang="ts">
import { VGotoTop } from '@/components/molecules'
import { VFooter, VHeader } from '@/components/organisms'
</script>
<template>
    <div>
        <VHeader />
        <VGotoTop />
        <slot></slot>
        <VFooter />
    </div>
</template>
