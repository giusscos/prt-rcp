<script setup lang="ts">
import { toast } from 'vue-sonner'

const props = defineProps(['product'])

const config = useRuntimeConfig()

const isLoading = useIsLoading()

const supabase = useSupabaseClient()

function confirmDelete() {
    toast.warning('Are your sure?', {
        description: 'This product will be deleted definitly',
        action: {
            label: 'Confirm',
            onClick: () => onDelete(),
        },
    })
}

async function onDelete() {
    try {
        isLoading.value = true

        const { error } = await supabase
            .from('ingredients')
            .delete()
            .eq('id', props['product'].id)

        isLoading.value = false

        if (error) throw error
        isLoading.value = false
    } catch (err) {
        isLoading.value = false
        console.log(err)
    }
}
</script>

<template>
    <div class="p-4 border border-neutral-700 rounded-xl w-full flex flex-col gap-2">
        <div class="flex flex-wrap-reverse">
            <div>
                <span class="text-[0.65rem] text-muted-foreground line-clamp-1">
                    Created on {{ $dayjs(props.product.created_at).format('MMMM DD, YYYY') }}
                </span>

                <div class="flex flex-wrap gap-y-0 gap-x-2">
                    <h3 class="text-3xl font-semibold line-clamp-1">
                        {{ props.product.name }}
                    </h3>
                    <span class="mt-auto text-lg font-normal">
                        {{ props.product.quantity }}{{ props.product.units.abbreviation ?? "" }}
                    </span>
                </div>
            </div>

            <Badge class="w-fit ml-auto mb-auto capitalize">
                {{ props.product.status }}
            </Badge>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 justify-center items-center w-full mt-auto">
            <Button type="button" variant="destructive" @click="confirmDelete">
                Delete
            </Button>
            <NuxtLink :to="'/grocery-list/update/' + props.product.slug">
                <Button class="w-full">
                    Edit
                </Button>
            </NuxtLink>
        </div>
    </div>
</template>