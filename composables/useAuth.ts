import { ref } from 'vue'
import type { User } from '@supabase/supabase-js'

export interface NavBarLink {
  label: string;
  href: string;
  title: string;
}

export interface Credentials {
  username: string;
  email: string;
  password: string;
}

export interface Profile {
  id: string;
  username: string;
}

export const defaultNavLink = [
  {
      label: "Recipes",
      href: "/recipes",
      title: "Go to Recipes page"
  },
  {
      label: "Grocery List",
      href: "/grocery-list",
      title: "Go to Grocery List page"
  }
]

export const dashboardNavLink = {
    label: "Dashboard",
    href: "/dashboard",
    title: "Go to Dashboard page"
}

export const useAuth = () => {
  const supabase = useSupabaseClient()

  const user = ref<User | null>(null)

  const links = useNavBarLinks()

  const isLoggedIn = useIsLoggedInUser()

  const isLoading = useIsLoading()

  const checkAuth = async () => {
    try {
      isLoading.value = true
      
      const { data, error } = await supabase.auth.getUser()

      isLoading.value = false

      if (error) throw error

      links.value.unshift(dashboardNavLink)      

      user.value = data.user

      isLoggedIn.value = true
    } catch (err) {
      user.value = null

      isLoggedIn.value = false

      isLoading.value = false
      
      console.log(err)
    }
  }

  const signUp = async (username: string, email: string, password: string) => {
    try {
      isLoading.value = true

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      });

      isLoading.value = false
      
      if (error) throw error;

      user.value = data.user

      links.value.unshift(dashboardNavLink)      

      const userId = data.user?.id;

      if (!userId) throw new Error('User not found');

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: userId, username: username }] as any);

      if (profileError) throw profileError;

      isLoggedIn.value = true      
    } catch (err) {
      console.log(err);
  
      isLoading.value = false
    }
  }

  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true

      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      isLoading.value = false

      if (error) throw error

      user.value = data.user

      isLoggedIn.value = true
      
      links.value.unshift(dashboardNavLink)

      navigateTo('/dashboard')
    } catch (err) {
      console.log(err)

      isLoading.value = false
    }
  }

  const logout = async (): Promise<void> => {
    isLoading.value = true

    const { error } = await supabase.auth.signOut()

    isLoading.value = false

    if (error) throw error

    isLoggedIn.value = false

    links.value = defaultNavLink

    navigateTo('/')

    user.value = null
  }

  return {
    user,
    links,
    checkAuth,
    signUp,
    login,
    logout,
  }
}
