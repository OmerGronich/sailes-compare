<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md">
      <q-table :rows="rows" :columns="columns" row-key="name" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import rows from './mocks/data.ts';
import columns from './columns.ts';

export default {
  name: 'TableView',
  components: {},
  setup() {
    return { rows, columns };
  },
};
</script>
