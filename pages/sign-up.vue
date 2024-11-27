<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const { signUp } = useAuth()

const isLoading = useIsLoading()

const credentials = ref<Credentials>({
  username: "",
  email: "",
  password: ""
})

async function onSubmit() {
  signUp(credentials.value.username, credentials.value.email, credentials.value.password) 
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-xl">
          Sign Up
        </CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid grid-cols-1 gap-4">
            <div class="grid gap-2">
              <Label for="username">Username</Label>
              <Input id="username" placeholder="JBond" v-model="credentials.username" required />
            </div>
          </div>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" v-model="credentials.email" required />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input id="password" type="password" placeholder="N0t4S:mp1ePa55w0rd" v-model="credentials.password" required />
          </div>
          <Button type="submit" :disabled="isLoading" class="w-full">
            <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
            Create an account
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <NuxtLink to="/login" class="underline">
            Sign in
          </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </form>
</template>