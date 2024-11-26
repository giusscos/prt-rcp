<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const supabase = useSupabaseClient()
const email = ref<string>("")

async function onSubmit() {
  let { data, error } = await supabase.auth.resetPasswordForEmail(email.value)
}

</script>

<template>
  <form @submit.prevent="onSubmit">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          Forgot your password?
        </CardTitle>
        <CardDescription>
          Enter your email below to receive the link to reset it
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" v-model="email" required />
          </div>
          <Button type="submit" class="w-full">
            Send
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