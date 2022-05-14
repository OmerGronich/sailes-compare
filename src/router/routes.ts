import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/SelectCompany.vue')
      },
      {
        path: '/select-funds',
        component: () => import('pages/SelectFunds.vue')
      },
      {
        path: '/fund-comparison',
        component: () => import('pages/FundComparison.vue')
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
