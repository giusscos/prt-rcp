<script setup lang="ts">
import {
    MoreHorizontal,
} from 'lucide-vue-next'
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
        <div class="flex">
            <div>
                <span class="text-[0.65rem] text-muted-foreground">
                    Created on {{ $dayjs(props.product.created_at).format('MMMM DD, YYYY') }}
                </span>

                <h3 class="text-3xl font-semibold line-clamp-1">
                    {{ props.product.name }}
                    <span class="mt-auto text-lg font-normal">
                        {{ props.product.quantity }}{{ props.product.units.abbreviation ?? "" }}
                    </span>
                </h3>
            </div>

            <Badge class="w-fit ml-auto mb-auto">
                {{ props.product.status }}
            </Badge>
        </div>

        <div class="flex gap-4">
            <img :src="`${config.public.supabaseStorageUrl}${props.product.image_url}`"
                :alt="'Thumbnail ' + props.product.name + ' ingredient'"
                class="size-32 aspect-square rounded-xl border border-neutral-600">

            <div class="flex flex-col h-full gap-4">
                <p class="line-clamp-3">
                    {{ props.product.description }}
                </p>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button aria-haspopup="true" size="icon" variant="ghost" class="ml-auto self-start">
                        <MoreHorizontal class="h-4 w-4" />
                        <span class="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <NuxtLink :to="'/grocery-list/update/' + props.product.slug"
                            class="block w-full text-left whitespace-nowrap">
                            Edit
                        </NuxtLink>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <button type="button" class="block w-full text-left text-destructive whitespace-nowrap"
                            @click="confirmDelete">
                            Delete
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</template>