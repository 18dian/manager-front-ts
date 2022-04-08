import { createRouter, createWebHashHistory } from 'vue-router';
import BasicLayout from '../layouts/BasicLayout/index.vue';

const routes = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('../views/Home/index.vue')
      },
      {
        path: '/menu',
        component: () => import('../views/Menu/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login/index.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
