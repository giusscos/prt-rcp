<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle
} from 'lucide-vue-next'

export type Status = "Active" | "Draft" | "Archive"

export interface NutritionalValue {
  kcal: number;
  carboidrates: number;
  sugar: number;
  proteins: number;
  fats: number;
  fibers: number;
}

export interface Ingredient {
  id: string;
  user_id: string;
  name: string;
  nutritional_values: NutritionalValue;
  description: string;
  status: Status;
  quantity: number;
  unit: string;
  image_url: string;
  created_at: string;
}

const supabase = useSupabaseClient()

const products = ref<Ingredient[]>([])

async function getIngredients() {
  try {
    const { data: ingredients, error } = await supabase
      .from('ingredients')
      .select('*')
      .range(0, 9)

    if (error) throw error

    products.value = ingredients
  } catch (err) {
    console.log(err)
  }
}

const channel = supabase.channel('custom-all-channel')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'ingredients' },
    (payload) => {
      console.log('Change received!', payload)
      const { new: newProduct } = payload;
      products.value = products.value.map(product => {
        if (product.id == newProduct.id) {
          return {
            ...product,
            ...newProduct
          }
        }
        return product
      })
    }
  )
  .subscribe()

onMounted(() => {
  getIngredients()
})
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40 py-4">
    <div class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">

      <Tabs default-value="all">
        <div class="flex items-center">

          <TabsList>
            <TabsTrigger value="all">
              All
            </TabsTrigger>
            <TabsTrigger value="active">
              Active
            </TabsTrigger>
            <TabsTrigger value="draft">
              Draft
            </TabsTrigger>
            <TabsTrigger value="archived" class="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>

          <div class="ml-auto flex items-center gap-2">
            <template v-if="products.length > 0">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="outline" size="sm" class="h-7 gap-1">
                    <ListFilter class="h-3.5 w-3.5" />
                    <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem checked>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem>Draft</DropdownMenuItem>
                  <DropdownMenuItem>
                    Archived
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button size="sm" variant="outline" class="h-7 gap-1">
                <File class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
            </template>

            <CreateProduct />

          </div>
        </div>
        <TabsContent value="all">
          <Card>

            <template v-if="products.length > 0">
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Manage your products and view their sales performance.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div class="flex flex-nowrap gap-4" v-for="product in products">
                  <div
                    class="aspect-square w-24 h-24 bg-neutral-900 text-background dark:text-foreground rounded-full border border-neutral-500 flex justify-center items-center">
                    <span class="font-semibold"> Photo</span>
                  </div>
                  <div class="flex flex-col gap-4">
                    <h3>{{ product.name }}</h3>
                    <Badge>{{ product.status }}</Badge>
                    <p>{{ product.description }}</p>
                    <span>{{ product.created_at }}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal class="h-4 w-4" />
                        <span class="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </template>
            <template v-else>
              <CardHeader>
                <CardTitle>No products found</CardTitle>
                <CardDescription>
                  You can add a product or change some filters
                </CardDescription>
              </CardHeader>
            </template>
            <CardFooter>
              <template v-if="products.length > 0">
                <div class="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong>
                  products
                </div>
              </template>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>

<style scoped></style>
