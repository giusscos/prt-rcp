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
import {
    MoreHorizontal,
} from 'lucide-vue-next'

import { Input } from '@/components/ui/input'

const props = defineProps(["productId"])

const isLoading = useIsLoading()

const units = ref<Units[]>([])

const product = ref<InsertIngredient>({
    name: "",
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

        product.value.unit_id = Number(unitString.value)

        const { data, error } = await supabase
            .from('ingredients')
            .update(product.value as never)
            .eq("id", props['productId'])
            .select()

        isLoading.value = false

        if (error) throw error

        if (data) console.log({ data })
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
                    <DialogTrigger as-child>
                        <Button variant="ghost">
                            <span class="whitespace-nowrap">
                                Edit
                            </span>
                        </Button>
                    </DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>
                    Edit your product here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>

            <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
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