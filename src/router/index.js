import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/DashboardPage.vue'),
    beforeEnter: (to, from, next) => {
      const userName = localStorage.getItem("userName");
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");

      if (!userName || !email || !password) {
        next('/register'); // Agar login qilinmagan bo'lsa, register sahifasiga yo'naltirish
      } else {
        next(); // Dashboardga o'tish
      }
    },
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: () => import('@/pages/PricePage.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/RegisterPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
