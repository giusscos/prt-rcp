<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
const { checkAuth } = useAuth()

onMounted(() => {
  checkAuth()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster />
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