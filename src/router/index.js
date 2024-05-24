import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '@/pages/IndexPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const routes = [
    { path: '/', component: IndexPage },
    { path: '/notfound', component: NotFoundPage },
    { path: '/:pathMatch(.*)', redirect: '/notfound' },
];

const router = new createRouter({
    history: createWebHistory(),
    routes
});

export default router;