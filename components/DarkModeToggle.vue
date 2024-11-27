<script setup lang="ts">
import { Switch } from '@/components/ui/switch'
import { Icon } from '@iconify/vue'

const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

const isDark = computed(() => colorMode.preference === 'dark')
</script>

<template>
  <ClientOnly>
    <Switch :checked="isDark" @update:checked="toggleTheme">
      <template #thumb>
        <Icon v-if="isDark" icon="line-md:sunny-filled-loop-to-moon-filled-loop-transition" class="w-full h-full p-1" />
        <Icon v-else icon="line-md:moon-filled-alt-to-sunny-filled-loop-transition" class="w-full h-full p-1" />
      </template>
    </Switch>
  </ClientOnly>
</template>