import { createRouter, createWebHistory } from 'vue-router';
import LoginSac from '@/components/LoginSac.vue';
import HomeAssinante from '@/components/HomeAssinante.vue';
import pinia  from '@/store/store.js';

const routes = [
  {
    path: '/',
    component: HomeAssinante
  },
  {
    path: '/login',
    component: LoginSac
  },
  {
    path: '/assinante',
    component: HomeAssinante,
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = pinia.state.auth.isAuthenticated;

    if (!isAuthenticated) {
      // Não autenticado, redirecionar para a página de login
      next('/login');
    } else {
      // Autenticado, permitir acesso à rota protegida
      next();
    }
  } else {
    // Página não protegida, permitir acesso normalmente
    next();
  }
});

export default router;
