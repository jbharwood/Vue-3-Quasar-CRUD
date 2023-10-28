<template>
    <q-item v-ripple v-if="task">
        <q-item-section>
            <router-link
                :to="{ name: 'TaskDetails', params: { id: task.id } }"
                style="text-decoration: none; color: inherit"
            >
                <q-item-label>
                    {{ task.title }}
                </q-item-label>
                <q-item-label caption>
                    {{ task.id }}
                </q-item-label>
                <q-item-label caption>
                    {{ task.isFav }}
                </q-item-label>
            </router-link>
        </q-item-section>
        <q-item-section side top>
            <q-item-label caption>
                <button @click="store.deleteTasks(task.id)">delete</button>
            </q-item-label>
            <q-item-label caption>
                <button @click="store.toggleFav(task.id)">toggle fav</button>
            </q-item-label>
        </q-item-section>
    </q-item>
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
