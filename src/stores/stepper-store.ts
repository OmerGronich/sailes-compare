import { defineStore } from 'pinia';
import { Router } from 'vue-router';

interface Step {
  title: string;
  icon: string;
  name: number;
  path: string;
}

export enum Routes {
  SelectCompany = '/select-company',
  SelectFunds = '/select-funds',
  FundComparison = '/fund-comparison'
}

const steps: Step[] = [
  { title: 'בחר חברה', icon: 'work', name: 1, path: Routes.SelectCompany },
  { title: 'טבלה', icon: 'table_chart', name: 2, path: Routes.SelectFunds },
  { title: 'צ׳ארט', icon: 'insert_chart', name: 3, path: Routes.FundComparison },
];

export const useStepperStore = defineStore('stepper', {
  state: () => ({
    currentStepName: 1,
    steps,
  }),
  getters: {},
  actions: {
    initCurrentStepName(router: Router) {
      const step = steps.find(
        (step) => router.currentRoute.value.path === step.path
      );
      this.currentStepName = step?.name ?? 1;
    },
    goToNextStep(
      $refs: {
        readonly stepper: { next: () => void } & HTMLElement;
        [p: string]: unknown;
      },
      router: Router
    ) {
      $refs.stepper.next();
      this.navigateToStep(router);
    },
    goToPreviousStep(
      $refs: {
        readonly stepper: { previous: () => void } & HTMLElement;
        [p: string]: unknown;
      },
      router: Router
    ) {
      $refs.stepper.previous();
      this.navigateToStep(router);
    },
    navigateToStep(router: Router) {
      const stepIndex = this.steps.findIndex(
        (step) => step.name === this.currentStepName
      );
      const to = this.steps[stepIndex].path;
      router.push(to);
    },
  },
});
