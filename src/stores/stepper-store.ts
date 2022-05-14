import { defineStore } from 'pinia';
import { useRouter }   from 'vue-router';

export const useStepperStore = defineStore('stepper', {
  state: () => ({
    currentStepName: 1,
    steps: [
      { title: 'בחר חברה', icon: 'work', name: 1 },
      { title: 'טבלה', icon: 'table_chart', name: 2 },
      { title: 'צ׳ארט', icon: 'insert_chart', name: 3 },
    ],
  }),
  getters: {},
  actions: {
    goToNextStep($refs: {readonly stepper: {next: () => void} & HTMLElement, [p: string]: unknown}) {
      const router = useRouter();
      router.push('shtok')
      $refs.stepper.next();
    },
    goToPreviousStep($refs: {readonly stepper: {previous: () => void} & HTMLElement, [p: string]: unknown}) {
      $refs.stepper.previous();
    }
  },
});

