<template>
    <button @click="store.$reset">reset</button>
    <button @click="sortMethod = 'id'">order by id</button>
    <button @click="sortMethod = 'title'">order by title</button>
    <div v-if="orderedTasks.length">
        <div v-for="task in orderedTasks" :key="task.id">
            <TaskDetails :task="task" />
        </div>
    </div>
</template>

<script setup lang="ts">
import TaskDetails from './TaskDetails.vue'
import { useCounterStore } from 'stores/example-store'
import { computed, ref } from 'vue'
import { ITask } from './models'

const store = useCounterStore()

const sortMethod = ref('id')

store.getTasks()

const orderedTasks = computed((): ITask[] => {
    if (sortMethod.value == 'title') {
        return [...store.tasks].sort((a: ITask, b: ITask) => {
            return a.title > b.title ? 1 : -1
        })
    }

    return store.tasks
})
</script>

<style></style>
