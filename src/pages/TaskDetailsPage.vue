<template>
    <div class="center">
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
                    <q-btn
                        @click="store.deleteTasks(task.id)"
                        color="dark"
                        label="delete"
                    />
                </q-item-label>
                <q-item-label caption>
                    <q-btn
                        @click="store.toggleFav(task.id)"
                        color="dark"
                        label="toggle fav"
                    />
                </q-item-label>
            </q-item-section>
        </q-item>
        <q-item-label caption>
            <q-btn @click="$router.go(-1)" color="dark" label="back" />
        </q-item-label>
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
