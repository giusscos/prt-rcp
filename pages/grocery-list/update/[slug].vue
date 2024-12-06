<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-vue-next'

const route = useRoute()

const selectedFile = ref<File | null>(null)

const isLoading = useIsLoading()

const units = ref<Units[]>([])

const product = ref<InsertIngredient>({
    name: "",
    slug: "",
    status: "",
    quantity: 100,
    unit_id: 0
})

const unitString = ref<string>("")

const supabase = useSupabaseClient()

async function onSubmit() {
    try {
        isLoading.value = true

        product.value.slug = createSlug(product.value.name);

        product.value.unit_id = Number(unitString.value)

        const { error } = await supabase
            .from('ingredients')
            .update(product.value as never)
            .eq("slug", route.params.slug)
            .select()

        isLoading.value = false

        if (error) throw error

        isLoading.value = false

        navigateTo('/grocery-list')
    } catch (err) {
        isLoading.value = false
        console.log(err)
    }
}

async function getProduct() {
    try {
        let { data, error } = await supabase
            .from('ingredients')
            .select('*')
            .eq("slug", route.params.slug)

        if (error) throw error

        if (!data) { return }

        product.value = data[0]

        unitString.value = product.value.unit_id.toString()
    } catch (err) {
        console.log(err)
    }
}

function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        selectedFile.value = target.files[0];
    }
}

async function getUnits() {
    try {
        let { data, error } = await supabase
            .from('units')
            .select('*')

        if (error) throw error

        if (!data) { return }

        units.value = data
    } catch (err) {
        console.log(err)
    }
}

onMounted(() => {
    getUnits()
    getProduct()
})
</script>

<template>
    <section class="sm:container mx-auto">
        <h2 class="text-4xl font-semibold">
            Edit product
        </h2>

        <p class="text-xl lg:text-2xl text-muted-foreground font-semibold py-4">
            Edit your product here. Click save when you're done.
        </p>

        <form @submit.prevent="onSubmit" class="flex flex-col gap-4">


            <div class="grid gap-2">
                <Label for="name">
                    Name
                </Label>
                <Input id="name" type="text" placeholder="Pasta" v-model="product.name" required />
            </div>

            <div class="flex items-center flex-wrap gap-4">
                <div class="grid gap-2">
                    <Label for="status">
                        Status
                    </Label>
                    <Select id="status" v-model="product.status" required>
                        <SelectTrigger class="w-full">
                            <SelectValue placeholder="Select status" class="capitalize" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Select status</SelectLabel>
                                <SelectItem v-for="status in productStatus" :key="status" :value="status"
                                    class="capitalize">
                                    {{ status }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div class="grid gap-2">
                    <Label for="quantity">
                        Quantity
                    </Label>
                    <Input id="quantity" type="number" placeholder="100" v-model="product.quantity" required />
                </div>

                <div class="grid gap-2">
                    <Label for="unit">
                        Unit
                    </Label>
                    <Select id="unit" v-model="unitString" required>
                        <SelectTrigger class="w-full">
                            <SelectValue placeholder="Select unit" class="capitalize" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Select unit</SelectLabel>
                                <SelectItem v-for="unit in units" :key="unit.id" :value="unit.id.toString()"
                                    class="capitalize">
                                    {{ unit.name }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div class="flex">
                <NuxtLink to="/grocery-list">
                    <Button type="button" variant="secondary">
                        Cancel
                    </Button>
                </NuxtLink>

                <Button type="submit" :disabled="isLoading" class="ml-auto">
                    <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
                    Save
                </Button>
            </div>
        </form>
    </section>
</template>