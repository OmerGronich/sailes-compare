import { RouteRecordRaw } from 'vue-router';
import { Routes }         from 'stores/stepper-store';

const routes: RouteRecordRaw[] = [
  {
    component: () => import('layouts/MainLayout.vue'),
    path: '/',
    children: [
      {
        path: '/',
        component: () => import('pages/GettingStarted.vue')
      },
      {
        path: Routes.SelectCompany,
        component: () => import('pages/SelectCompany.vue')
      },
      {
        path: Routes.SelectFunds,
        component: () => import('pages/SelectFunds.vue')
      },
      {
        path: Routes.FundComparison,
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
