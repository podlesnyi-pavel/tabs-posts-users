<script lang="ts">
import { defineComponent } from 'vue';
import appTabs from '@/components/app-tabs/app-tabs.vue';

export default defineComponent({
  components: {
    appTabs
  }
});
</script>

<template>
  <app-tabs />
</template>
