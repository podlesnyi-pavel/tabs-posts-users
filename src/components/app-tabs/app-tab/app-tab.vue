<template>
  <li class="tabs__tab" @click="changeTab">{{ title }}</li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'appTab',
  props: {
    tabType: {
      type: String
    },
    title: {
      type: String,
      required: true
    }
  },
  emits: ['changeTab'],
  methods: {
    changeTab() {
      this.$emit('changeTab', this.tabType);
    }
  }
});
</script>
