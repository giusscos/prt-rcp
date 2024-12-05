<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-vue-next'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'


import { Input } from '@/components/ui/input'

const props = defineProps(["productId"])

const selectedFile = ref<File | null>(null)

const isLoading = useIsLoading()

const units = ref<Units[]>([])

const product = ref<InsertIngredient>({
    name: "",
    slug: "",
    image_url: "",
    description: "",
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

        if (selectedFile.value) {
            const { error: storageError } = await supabase
                .storage
                .from('ingredients')
                .upload(product.value.slug, selectedFile.value);

            if (storageError) throw storageError;

            product.value.image_url = 'ingredients/' + product.value.slug;
        }

        product.value.unit_id = Number(unitString.value)

        const { data, error } = await supabase
            .from('ingredients')
            .update(product.value as never)
            .eq("id", props['productId'])
            .select()

        isLoading.value = false

        if (error) throw error

        isLoading.value = false
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
            .eq("id", props['productId'])

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
    <Dialog>
        

        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>
                    Edit your product here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>

            <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
                <div class="grid gap-1.5">
                    <Label for="picture">Picture</Label>
                    <Input id="picture" type="file" @change="handleFileChange" />
                </div>

                <div class="grid gap-2">
                    <Label for="name">
                        Name
                    </Label>
                    <Input id="name" type="text" placeholder="Pasta" v-model="product.name" required />
                </div>

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
                    <Label for="description">
                        Description
                    </Label>
                    <Textarea id="description" placeholder="Very simple homemade pasta..."
                        v-model="product.description" />
                </div>

                <div class="flex items-end flex-unwrap gap-4">
                    <div class="grid gap-2">
                        <Label for="quantity">
                            Quantity
                        </Label>
                        <Input id="quantity" type="number" placeholder="100" v-model="product.quantity" required />
                    </div>

                    <div class="grid gap-2 w-full">
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

                <DialogFooter>
                    <DialogClose>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>

                    <DialogClose>
                        <Button type="submit" :disabled="isLoading" class="ml-auto">
                            <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>