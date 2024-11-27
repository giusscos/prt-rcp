<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const { login } = useAuth()

const isLoading = useIsLoading()

const credentials = ref<Credentials>({
  username: "",
  email: "",
  password: ""
})

async function onSubmit() {
  login(credentials.value.email, credentials.value.password)
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          Login
        </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="email@example.com" v-model="credentials.email" required />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <NuxtLink to="/forgot-password" class="ml-auto inline-block text-sm underline">
                Forgot your password?
              </NuxtLink>
            </div>
            <Input id="password" type="password" v-model="credentials.password" placeholder="********" required />
          </div>
          <Button type="submit" :disabled="isLoading" class="w-full">
            <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
            Login
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <NuxtLink to="/sign-up" class="underline">
            Sign up
          </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </form>
</template>