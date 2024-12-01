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
  ListFilter
} from 'lucide-vue-next'

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

supabase.channel('custom-all-channel')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'ingredients' },
    (payload) => {
      const { new: newProduct, eventType, old } = payload;

      if (eventType === "DELETE") {
        const oldProd = old as Ingredient

        const indexProd = products.value.findIndex((el) => el.id == oldProd.id)

        products.value.splice(indexProd, 1)

        return
      }

      const newProd = newProduct as Ingredient

      const indexProd = products.value.findIndex((el) => el.id == newProd.id)

      if (indexProd != -1) {
        products.value[indexProd] = newProd
      } else if (indexProd == -1) {
        products.value.push(newProd)
      }
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

          <TabsList class="hidden sm:flex">
            <TabsTrigger value="all">
              All
            </TabsTrigger>
            <TabsTrigger v-for="status in productStatus" :key="status" :value="status" class="capitalize">
              {{ status }}
            </TabsTrigger>
          </TabsList>

          <div class="ml-auto flex items-center gap-2">
            <template v-if="products.length > 0">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="outline" size="sm" class="h-7 gap-1 sm:hidden">
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
                <CardTitle>All Products</CardTitle>
                <CardDescription>
                  Manage your products and view their sales performance.
                </CardDescription>
              </CardHeader>

              <CardContent class="grid lg:grid-cols-2 gap-4">
                <div
                  class="p-4 flex flex-col sm:flex-row items-start gap-6 border border-neutral-700 rounded-xl w-full"
                  v-for="product in products">

                  <div
                    class="aspect-square w-32 h-32 bg-neutral-900 text-background dark:text-foreground rounded-xl border border-neutral-600 flex justify-center items-center">
                    <span class="font-semibold">
                      Photo
                    </span>
                  </div>

                  <div class="flex flex-col gap-4">
                    <h3 class="text-2xl">
                      {{ product.name }}
                    </h3>
                    <Badge class="w-fit">
                      {{ product.status }}
                    </Badge>
                    <p>
                      {{ product.description }}
                    </p>
                    <span class="text-xs">
                      Created on {{ $dayjs(product.created_at).format('MMMM DD, YYYY') }}
                    </span>
                  </div>

                  <EditProduct :product-id="product.id" />
                  <!-- <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button aria-haspopup="true" size="icon" variant="ghost" class="ml-auto self-start">
                        <MoreHorizontal class="h-4 w-4" />
                        <span class="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> -->
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
            <!-- <CardFooter>
              <template v-if="products.length > 0">
                <div class="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong>
                  products
                </div>
              </template>
            </CardFooter> -->
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>

<style scoped></style>
