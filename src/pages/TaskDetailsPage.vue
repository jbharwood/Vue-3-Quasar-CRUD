<template>
    <div v-if="task">
        <div>{{ task.id }}</div>
        <div>{{ task.title }}</div>
        <div>{{ task.isFav }}</div>
        <router-link to="/">
            <button @click="store.deleteTasks(task.id)">delete</button>
        </router-link>
        <button @click="store.toggleFav(task.id)">toggle fav</button>
        <button @click="$router.go(-1)">back</button>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCounterStore } from 'stores/example-store'
import { storeToRefs } from 'pinia'

const { task } = storeToRefs(useCounterStore())
const store = useCounterStore()

const props = defineProps({
    id: String,
})

onMounted(async () => {
    store.getTask(Number(props.id))
})
</script>

<style scoped></style>
