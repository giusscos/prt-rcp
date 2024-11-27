<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'

const isLoggedIn = useIsLoggedInUser()
</script>

<template>
  <div>
    <section class="grid grid-cols-12 gap-6">
      <Card class=" col-span-5 overflow-hidden">
        <CardContent class="flex aspect-square items-center justify-center p-0">
          <img src="https://picsum.photos/seed/picsum/700/900" alt="images shocase"
            class="object-cover object-center w-full h-full block">
        </CardContent>
      </Card>

      <div class="col-span-6 flex flex-col gap-4">
        <h2 class="text-6xl font-serif font-bold">
          Showcase your recipes and expand your audience 🌍
        </h2>
        <p class="text-2xl font-semibold">
          Showcase your unique recipes and connect with a broader audience, inspire others, and turn wasted food
          into culinary masterpieces.
        </p>
        <Button class="w-fit">
          <NuxtLink :to="isLoggedIn ? '/dashboard' : '/login'">
            {{ isLoggedIn ? 'Go to Dashboard' : 'Sign In' }}
          </NuxtLink>
        </Button>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
