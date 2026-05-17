<script setup lang="ts">
import { computed } from 'vue';
import BaseCard from '~/components/common/BaseCard.vue';
import mockData from '../../../data/mock-schedules.json';

const dutyColors = computed(() => {
  return mockData.legend.reduce((acc, item) => {
    acc[item.code] = item.color;
    return acc;
  }, {} as Record<string, string>);
});

const legendItems = computed(() => mockData.legend);
</script>

<template>
  <BaseCard class="duty-legend">
    <h3>Duty Type Legend</h3>
    <div class="legend-grid">
      <div v-for="item in legendItems" :key="item.code" class="legend-item">
        <span class="color-dot" :style="{ backgroundColor: item.color }"></span>
        <span class="code-label">{{ item.code }} - {{ item.label }}</span>
      </div>
    </div>
  </BaseCard>
</template>

<style lang="scss" scoped>
.duty-legend {
  margin-top: 1.5rem;
  padding: 1rem;
  h3 {
    font-size: 16px;
    color: v.$color-text-sec;
    margin-bottom: 0.8rem;
  }
}
.legend-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .color-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .code-label {
      font-size: 14px;
      color: v.$color-navy;
      font-weight: 500;
    }
  }
}
</style>