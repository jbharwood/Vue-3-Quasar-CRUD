<template>
    <q-item v-ripple v-if="task" style="max-width: 318px">
        <q-item-section>
            <q-item-label>
                {{ task.title }}
            </q-item-label>
            <q-item-label caption>
                {{ task.id }}
            </q-item-label>
            <q-item-label caption>
                {{ task.isFav }}
            </q-item-label>
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
    <q-item-label caption>
        <button @click="$router.go(-1)">back</button>
    </q-item-label>
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
