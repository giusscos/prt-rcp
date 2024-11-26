export default defineNuxtRouteMiddleware(async (to, from) => {
    const supabase = useSupabaseClient();
    const { data: session } = await supabase.auth.getSession();

    if (session?.session) {
        return navigateTo('/dashboard');
    }
});