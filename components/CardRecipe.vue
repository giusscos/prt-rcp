<script setup lang='ts'>
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

const props = defineProps({
    title: String,
    description: String,
    image: String,
})
</script>

<template>
    <Card class="w-[350px]">
        <CardHeader>
            <CardTitle>{{ props.title }}</CardTitle>
            <CardDescription>{{ props.description }}</CardDescription>
        </CardHeader>
        <CardContent>
            <img :src="props.image" :alt="props.title + ' image'" />
        </CardContent>
    </Card>
</template>