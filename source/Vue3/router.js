import { createRouter, createWebHashHistory, createWebHistory} from "vue-router";
const routes = [
    {
        path: '/',
        component: () => import('./src/components/HelloWorld.vue')
    },
    {
        path: '/HelloWorld',
        component: () => import('./src/components/HelloWorld.vue')
    },
    {
        path: '/html2canvas',
        component: () => import('./src/views/html2canvas/index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
