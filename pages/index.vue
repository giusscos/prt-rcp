<script setup lang="ts">
const isLoggedIn = useIsLoggedInUser()
</script>

<template>
  <section class="py-20">
    <div class="max-w-4xl mx-auto flex flex-wrap-reverse lg:flex-nowrap gap-6">
      <div
        class="w-full max-w-96 md:size-96 aspect-square bg-neutral-900 rounded-lg border border-neutral-500 flex justify-center items-center">
        <span class="text-2xl p-6 text-background dark:text-foreground">Photo</span>
      </div>

      <div>
        <h2 class="text-4xl lg:text-6xl font-serif font-bold">
          Showcase your recipes and expand your audience 🌍
        </h2>
        <p class="text-xl lg:text-2xl text-muted-foreground py-4">
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

  <section class="py-20">
    <h2 class="text-4xl font-serif font-semibold text-center mb-4">
      Discover thousand of recipes selected for you
    </h2>
    <div class="flex flex-col gap-6 overflow-auto pb-10">
      <div class="flex flex-nowrap gap-6">
        <template v-for="i in 6" :key="i">
          <CardRecipe class="min-w-[300px]" :title="'Recipe ' + i" :description="'Description ' + i" image="" />
        </template>
      </div>
      <div class="flex flex-nowrap gap-6">
        <template v-for="i in 6" :key="i">
          <CardRecipe class=" -translate-x-32 min-w-[300px]" :title="'Recipe ' + i" :description="'Description ' + i"
            image="" />
        </template>
      </div>
      <div class="flex flex-nowrap gap-6">
        <template v-for="i in 6" :key="i">
          <CardRecipe class="min-w-[300px]" :title="'Recipe ' + i" :description="'Description ' + i" image="" />
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
