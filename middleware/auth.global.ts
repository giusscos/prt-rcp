export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (user && (to.path == '/login' || to.path == '/sign-up')) {
    return navigateTo('/dashboard', { redirectCode: 301 })
  } else if (!user && to.path == '/dashboard') {
    return navigateTo('/login', { redirectCode: 301 })
  }
});