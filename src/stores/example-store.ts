import { defineStore } from 'pinia'
import { ITask } from 'src/components/models'

type State = {
    tasks: ITask[]
    task: ITask | null
    isLoading: boolean
}

export const useCounterStore = defineStore('counter', {
    state: (): State => ({
        tasks: [],
        task: null,
        isLoading: false,
    }),
    getters: {
        favs(): ITask[] {
            return this.tasks.filter((x) => x.isFav)
        },
        favCount(): number {
            return this.tasks.reduce((p, c) => {
                return c.isFav ? p + 1 : p
            }, 0)
        },
        totalCount: (state) => state.tasks.length,
    },
    actions: {
        async getTasks() {
            try {
                this.isLoading = true
                const res = await fetch('http://localhost:3000/tasks')
                const data = await res.json()

                if (res.ok) {
                    this.tasks = data
                    this.isLoading = false
                } else console.log('Error: ' + res.status)
            } catch (e) {
                console.log('Error:', e)
            }
        },
        async getTask(id: number) {
            try {
                this.isLoading = true
                const res = await fetch('http://localhost:3000/tasks/' + id)
                const data = await res.json()

                if (res.ok) {
                    this.task = data
                    this.isLoading = false
                } else console.log('Error: ' + res.status)
            } catch (e) {
                console.log('Error:', e)
            }
        },
        async addTasks(task: ITask) {
            try {
                this.tasks.push(task)

                const res = await fetch('http://localhost:3000/tasks', {
                    method: 'POST',
                    body: JSON.stringify(task),
                    headers: { 'Content-Type': 'application/json' },
                })
                if (res.ok) console.log('Got what we wanted')
                else console.log('Error: ' + res.status)
            } catch (e) {
                console.log('Error:', e)
            }
        },
        async deleteTasks(id: number | undefined) {
            try {
                this.tasks = this.tasks.filter((t) => {
                    return id !== t.id
                })

                const res = await fetch('http://localhost:3000/tasks/' + id, {
                    method: 'DELETE',
                })
                if (res.ok) console.log('Got what we wanted')
                else console.log('Error: ' + res.status)
            } catch (e) {
                console.log('Error:', e)
            }
        },
        async toggleFav(id: number) {
            try {
                const task = this.tasks.find((t) => t.id === id)
                if (task) {
                    task.isFav = !task.isFav
                    const res = await fetch(
                        'http://localhost:3000/tasks/' + id,
                        {
                            method: 'PATCH',
                            body: JSON.stringify({ isFav: task.isFav }),
                            headers: { 'Content-Type': 'application/json' },
                        }
                    )
                    if (res.ok) {
                        this.task = task
                        console.log('Got what we wanted')
                    } else console.log('Error: ' + res.status)
                }
            } catch (e) {
                console.log('Error:', e)
            }
        },
    },
})
