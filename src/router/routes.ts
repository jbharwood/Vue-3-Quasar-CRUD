import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/IndexPage.vue') },
            {
                path: '/tasks/:id',
                name: 'TaskDetails',
                component: () => import('pages/TaskDetailsPage.vue'),
                props: true,
            },
            {
                path: '/settings',
                name: 'Settings',
                component: () => import('pages/SettingsPage.vue'),
                props: true,
            },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
]

export default routes
