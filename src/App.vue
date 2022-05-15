<template>
  <button
    style="
       {
        width: 100px;
        height: 100px;
      }
    "
    @click="dataStore.handleCompaniesSearch(['הראל'])"
  >
    משוך נתונים לדוגמא
  </button>
  <p>נתונים שנמשכו: {{dataStore.data}}</p>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDataStore } from 'stores/data-store';

export default defineComponent({
  name: 'App',
  setup() {
    const dataStore = useDataStore()
    return { dataStore };
  },
});
</script>
