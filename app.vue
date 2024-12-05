<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'

const colorMode = useColorMode()

const { checkAuth } = useAuth()

onMounted(() => {
  checkAuth()
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="text-foreground" />
    <NuxtPage />
    <Toaster richColors position="top-center" :theme="colorMode.preference == 'dark' ? 'dark' : 'light'" />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>