<template>
  <q-page class="column items-center justify-evenly">
    <div>הירו</div>

    <q-btn color="primary" label="התחל" @click="start()" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { QBtn } from 'quasar';
import { useRouter } from 'vue-router';
import { Routes } from 'stores/stepper-store';

export default defineComponent({
  name: 'GettingStarted',
  components: { QBtn },
  setup() {
    const router = useRouter();
    const start = () => {
      router.push(Routes.SelectCompany);
    };

    return { start };
  },
});
</script>
