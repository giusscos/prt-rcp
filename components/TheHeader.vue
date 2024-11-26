<script setup lang="ts">
import { Package2, Menu, Search } from 'lucide-vue-next'

const isLoggedIn = false

const links = [
  isLoggedIn ? {
    label: "Dashboard",
    href: "/dashboard",
    title: "Go to Dashboard page"
  } : {},
  {
    label: "Recipes",
    href: "/recipes",
    title: "Go to Recipes page"
  },
  {
    label: "Grocery List",
    href: "/grocery-list",
    title: "Go to Grocery List page"
  },
]

</script>

<template>
  <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
    <!-- Desktop -->
    <nav
      class="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <NuxtLink to="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
        <Package2 class="h-6 w-6" />
        <h1 class="text-xl">SpinFood</h1>
      </NuxtLink>

      <template v-for="link in links">
        <NuxtLink :to="link.href"
          class="inline-block flex-shrink-0 text-muted-foreground transition-colors hover:text-foreground"
          active-class="!text-foreground" :title="link.title">
          {{ link.label }}
        </NuxtLink>
      </template>
    </nav>

    <!-- Mobile -->
    <Sheet>
      <SheetTrigger as-child>
        <Button variant="outline" size="icon" class="shrink-0 md:hidden">
          <Menu class="h-5 w-5" />
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav class="grid gap-6 text-lg font-medium">

          <NuxtLink to="/" class="flex items-center gap-2 text-lg font-semibold">
            <Package2 class="h-6 w-6" />
            <h1 class="text-xl">SpinFood</h1>
          </NuxtLink>

          <DarkModeToggle />

          <template v-for="link in links">
            <NuxtLink :to="link.href" active-class="!text-foreground"
              class="text-muted-foreground hover:text-foreground" :title="link.title">
              {{ link.label }}
            </NuxtLink>
          </template>
        </nav>
      </SheetContent>
    </Sheet>

    <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <form class="ml-auto flex-1 sm:flex-initial">
        <div class="relative">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search recipes..." class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
        </div>
      </form>

      <DropdownMenu v-if="isLoggedIn">
        <DropdownMenuTrigger as-child>
          <Button variant="secondary" size="icon" class="rounded-full">
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/63466096?v=4" alt="@radix-vue" />
              <AvatarFallback>GC</AvatarFallback>
            </Avatar>
            <span class="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="ghost">
        <NuxtLink to="/login">
          Sign In
        </NuxtLink>
      </Button>

      <Button as-child>
        <NuxtLink to="/sign-up">
          Sign Up
        </NuxtLink>
      </Button>

      <DarkModeToggle class="hidden md:block" />
    </div>
  </header>
</template>