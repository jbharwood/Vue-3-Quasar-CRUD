<template>
    <div v-if="task">
        <router-link :to="{ name: 'TaskDetails', params: { id: task.id } }">
            <p>{{ task.title }}</p>
        </router-link>
        <p>{{ task.isFav }}</p>
        <button @click="store.deleteTasks(task.id)">delete</button>
        <button @click="store.toggleFav(task.id)">toggle fav</button>
    </div>
</template>

<script setup lang="ts">
import { ITask } from './models'
import { PropType } from 'vue'
import { useCounterStore } from 'stores/example-store'

const store = useCounterStore()

defineProps({
    task: Object as PropType<ITask>,
})
</script>

<style scoped></style>
