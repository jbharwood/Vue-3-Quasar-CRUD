import { ref } from "vue"

<template>
    <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
                filled
                v-model="title"
                label="Your task title *"
                hint="you know"
                lazy-rules
                :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                ]"
            />

            <div>
                <q-btn label="Submit" type="submit" color="primary" />
                <q-btn
                    label="Reset"
                    type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
                />
            </div>
        </q-form>
    </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useCounterStore } from 'stores/example-store'
import { ITask } from './models'

const store = useCounterStore()
const $q = useQuasar()
const title = ref(null)

const onSubmit = () => {
    if (title.value !== null) {
        const task: ITask = {
            title: title.value,
            isFav: false,
            id: Math.floor(Math.random() * 10000),
        }
        store.addTasks(task)
        $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted',
        })
    }
}

const onReset = () => {
    title.value = null
}
</script>

<style scoped></style>
