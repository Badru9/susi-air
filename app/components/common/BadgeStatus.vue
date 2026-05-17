<template>
  <span class="badge-status" :class="statusClass">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  status: 'success' | 'warning' | 'expired';
}>();

const statusClass = computed(() => `badge-${props.status}`);
</script>

<style lang="scss" scoped>
.badge-status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;

  &.badge-success {
    background-color: v.$color-success;
    color: white;
  }
  &.badge-warning {
    background-color: v.$color-warning;
    color: white;
  }
  &.badge-expired {
    background-color: v.$color-red;
    color: white;
  }
}
</style>