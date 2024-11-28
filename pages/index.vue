<script setup lang="ts">
const isLoggedIn = useIsLoggedInUser()
</script>

<template>
  <div>
    <section class="grid place-content-center px-10">
      <div class="flex flex-wrap-reverse lg:flex-nowrap gap-6 p-10">
        <div class="w-96 h-96 aspect-square bg-neutral-900 rounded-lg border border-neutral-500 flex justify-center items-center">
          <span class="text-2xl p-6">Photo</span>
        </div>

        <div>
          <h2 class="text-4xl lg:text-6xl font-serif font-bold">
            Showcase your recipes and expand your audience 🌍
          </h2>
          <p class="text-xl lg:text-2xl font-semibold py-4">
            Showcase your unique recipes and connect with a broader audience, inspire others, and turn wasted food
            into culinary masterpieces.
          </p>
          <Button class="w-fit">
            <NuxtLink :to="isLoggedIn ? '/dashboard' : '/login'">
              {{ isLoggedIn ? 'Go to Dashboard' : 'Sign In' }}
            </NuxtLink>
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
