import { createRouter, createWebHashHistory } from 'vue-router';
import BasicLayout from '../layouts/BasicLayout/index.vue';

const routes = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/home',
    meta: { title: '首页' },
    children: [
      {
        path: '/home',
        component: () => import('../views/Home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/menu',
        component: () => import('../views/Menu/index.vue'),
        meta: {
          title: '系统管理'
        },
        children: [
          {
            path: 'setting',
            component: () => import('../views/Menu/index.vue'),
            meta: {
              title: '用户管理'
            }
          }
        ]
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
