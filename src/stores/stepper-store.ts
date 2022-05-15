import { defineStore } from 'pinia';
import { Router } from 'vue-router';
import { useDataStore } from 'stores/data-store';

interface Step {
  title: string;
  icon: string;
  name: number;
  path: string;
}

const steps: Step[] = [
  { title: 'בחר חברה', icon: 'work', name: 1, path: '/' },
  { title: 'טבלה', icon: 'table_chart', name: 2, path: '/select-funds' },
  { title: 'צ׳ארט', icon: 'insert_chart', name: 3, path: '/fund-comparison' },
];

export const useStepperStore = defineStore('stepper', {
  state: () => {
    const dataStore = useDataStore();
    return { currentStepName: 1, steps, data: dataStore.data };
  },
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
