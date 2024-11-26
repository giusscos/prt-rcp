<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

definePageMeta({
    middleware: 'guest'
})

const supabase = useSupabaseClient()
const credentials = ref<Credentials>({
  username: "",
  email: "",
  password: ""
})

async function onSubmit() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.value.email,
      password: credentials.value.password
    });

    if (error) throw error;

    const userId = data.user?.id;

    if (!userId) throw new Error('Utente non creato correttamente.');

    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: userId, username: credentials.value.username }]);

    if (profileError) throw profileError;
  } catch (err) {
    console.error('Errore durante la registrazione:', err);
  }
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
          <Button type="submit" class="w-full">
            Create an account
          </Button>
          <!-- <Button variant="outline" class="w-full">
          Sign up with GitHub
        </Button> -->
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