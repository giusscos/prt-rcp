<script setup lang="ts">
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
import { PlusCircle } from 'lucide-vue-next'

const supabase = useSupabaseClient()

const isPageLoading = useIsPageLoading()

const selectedStatus = ref("all");

const page = ref(0);

const pageSize = ref(9);

const totalProducts = ref(0);

const products = ref<Ingredient[]>([])

async function getIngredients(currentPage = 1) {
  try {
    isPageLoading.value = true

    const from = (currentPage - 1) * pageSize.value;

    const to = from + pageSize.value - 1;

    const { data: ingredients, error, count } = await supabase
      .from('ingredients')
      .select('*, units(id, name, abbreviation)', { count: 'exact' })
      .like('status', selectedStatus.value != 'all' ? "%" + selectedStatus.value + "%" : '%%')
      .range(from, to)

    if (error) throw error

    products.value = ingredients ?? []

    totalProducts.value = count || 0;

    page.value = currentPage;

    isPageLoading.value = false
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

watch(selectedStatus, () => {
  getIngredients()
})
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40 py-4">
    <div class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs default-value="all">
        <div class="flex items-center">

          <TabsList class="hidden sm:flex">
            <TabsTrigger value="all" @click="selectedStatus = 'all'">
              All
            </TabsTrigger>
            <TabsTrigger v-for="status in productStatus" :key="status" :value="status" class="capitalize">
              <span @click="selectedStatus = status">
                {{ status }}
              </span>
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

            <NuxtLink to="/grocery-list/create">
              <Button size="sm" class="h-7 gap-1">
                <PlusCircle class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </NuxtLink>
          </div>
        </div>

        <TabsContent :value="selectedStatus">
          <Card>
            <template v-if="products.length > 0">
              <CardHeader>
                <CardTitle>All Products</CardTitle>
                <CardDescription>
                  Manage your products and view their sales performance.
                </CardDescription>
              </CardHeader>

              <CardContent class="grid lg:grid-cols-2 gap-4">
                <CardProduct v-for="(product, index) in products" :product="product" :key="'product-' + index" />
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
                <div class="flex items-center justify-between w-full">
                  <div class="text-xs text-muted-foreground">
                    Showing <strong>{{ (page - 1) * pageSize + 1 }}</strong> to
                    <strong>{{ Math.min(page * pageSize, totalProducts) }}</strong> of
                    <strong>{{ totalProducts }}</strong> products
                  </div>
                  <div class="flex gap-2">
                    <Button size="sm" variant="outline" :disabled="page === 1" @click="getIngredients(page - 1)">
                      Previous
                    </Button>
                    <Button size="sm" variant="outline" :disabled="page * pageSize >= totalProducts"
                      @click="getIngredients(page + 1)">
                      Next
                    </Button>
                  </div>
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
