<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Loader2, Shell, Menu, Search } from 'lucide-vue-next'

const { logout } = useAuth()

const links = useNavBarLinks()

const isLoading = useIsLoading()

const isLoggedIn = useIsLoggedInUser()
</script>

<template>
  <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
    <!-- Desktop -->
    <nav
      class="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <NuxtLink to="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
        <Shell class="h-6 w-6" />
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
            <Shell class="h-6 w-6" />
            <h1 class="text-xl">SpinFood</h1>
          </NuxtLink>

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
      <Dialog>
        <DialogTrigger class="ml-auto">
          <Search class="p-0.5 text-muted-foreground" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
            <DialogDescription>
              Search ingredients and recipes
            </DialogDescription>
          </DialogHeader>

          <form class="w-full">
            <Input type="search" placeholder="Carbonara recipe" />
          </form>
        </DialogContent>
      </Dialog>

      <DropdownMenu v-if="isLoggedIn">
        <DropdownMenuTrigger as-child>
          <Button variant="secondary" size="icon" class="rounded-full">
            <Avatar>
              <AvatarImage src="" alt="@radix-vue" />
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
          <Button @click="logout" variant="destructive" :disabled="isLoading" class="w-full">
            <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
            Logout
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>

      <template v-else-if="!isLoggedIn">
        <Button variant="ghost">
          <NuxtLink class="w-full h-full" to="/login">
            Sign In
          </NuxtLink>
        </Button>

        <Button as-child>
          <NuxtLink to="/sign-up">
            Sign Up
          </NuxtLink>
        </Button>
      </template>

      <DarkModeToggle />
    </div>
  </header>
</template>