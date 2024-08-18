import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '@/pages/IndexPage.vue'
import BlogPage from '@/pages/BlogPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const routes = [
    { path: '/', name: 'index', component: IndexPage },
    { path: '/book/:path', name: 'book', component: BlogPage },
    { path: '/notfound', name: 'notfound', component: NotFoundPage },
    { path: '/:pathMatch(.*)', redirect: '/notfound' },
];

const router = new createRouter({
    history: createWebHistory(),
    routes
});

export default router;