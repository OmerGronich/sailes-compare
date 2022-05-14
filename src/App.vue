<template>
  <button
    style="
       {
        width: 100px;
        height: 100px;
      }
    "
    @click="apiService.handleSearch(['הראל'])"
  >
    משוך נתונים לדוגמא
  </button>
  <p>נתונים שנמשכו:{{stepperStore.data}}</p>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ApiService } from './services/api';
import { useStepperStore } from 'stores/stepper-store';

export default defineComponent({
  name: 'App',
  setup() {
    const stepperStore = useStepperStore()
    const apiService = new ApiService();
    return { apiService, stepperStore };
  },
});
</script>
