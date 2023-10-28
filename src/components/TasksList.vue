<template>
    <div id="table-cms" class="table-cms">
        <q-input outlined v-model="search" label="Search..." />
    </div>
    <button @click="store.$reset">reset</button>
    <q-btn @click="sortMethod = 'id'" color="dark" label="order by id" />
    <q-btn @click="sortMethod = 'title'" color="dark" label="order by title" />
    <div class="q-pa-md bg-grey-10 text-white" v-if="orderedTasks.length">
        <q-list
            dark
            bordered
            separator
            style="max-width: 318px"
            v-for="task in searchFilter"
            :key="task.id"
        >
            <TaskDetails :task="task" />
        </q-list>
    </div>
</template>

<script setup lang="ts">
import TaskDetails from './TaskDetails.vue'
import { useCounterStore } from 'stores/example-store'
import { computed, ref } from 'vue'
import { ITask } from './models'

const sortMethod = ref('id')
const search = ref('')

const store = useCounterStore()
store.getTasks()

const searchFilter = computed((): ITask[] => {
    if (search.value) {
        return orderedTasks.value.filter((item: ITask) => {
            return search.value
                .toLowerCase()
                .split(' ')
                .every((v) => item.title.toLowerCase().includes(v))
        })
    } else {
        return orderedTasks.value
    }
})

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
