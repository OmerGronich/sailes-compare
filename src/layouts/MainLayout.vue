<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat icon='home' label="סיילס השוואות" @click="router.push('/')" />
        </q-toolbar-title>

      </q-toolbar>
    </q-header>
    <q-page-container>
      <div
        v-if="router.currentRoute.value.path === '/'"
        class="q-pa-md"
        dir="rtl"
      >
        <router-view></router-view>
      </div>
      <div v-else class="q-pa-md">
        <q-stepper
          v-model="currentStepName"
          ref="stepper"
          color="primary"
          animated
        >
          <q-step
            v-for="step in steps"
            :key="step.name"
            :name="step.name"
            :title="step.title"
            :icon="step.icon"
            :done="step.name < currentStepName"
          >
              <router-view />
          </q-step>
          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                @click="goToNextStep($refs, router)"
                color="primary"
                :label="currentStepName === steps.length ? 'סיים' : 'המשך'"
              />
              <q-btn
                v-if="currentStepName > 1"
                flat
                color="primary"
                @click="goToPreviousStep($refs, router)"
                label="Back"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useStepperStore } from 'stores/stepper-store';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup() {
    const router = useRouter();
    const stepperStore = useStepperStore();
    const { currentStepName, steps } = storeToRefs(stepperStore);
    const { goToPreviousStep, goToNextStep, initCurrentStepName } =
      stepperStore;

    onMounted(() => {
      console.log(router.currentRoute.value.path);
      initCurrentStepName(router);
    });

    return {
      goToPreviousStep,
      goToNextStep,
      currentStepName,
      steps,
      router,
    };
  },
});
</script>
