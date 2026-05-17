<template>
  <div class="limit-cards-wrapper">
    <BaseCard
      v-for="(card, index) in limitCards"
      :key="index"
      class="limit-card"
    >
      <h4 class="card-period">{{ card.period }}</h4>
      <p class="card-hours">{{ card.currentHours }} / {{ card.limit }} hrs</p>
      <div class="progress-bar-wrapper">
        <div class="progress-bar-container">
          <div
            class="progress-bar"
            :style="{
              width: card.percentage + '%',
              backgroundColor: card.color,
            }"
          ></div>
        </div>
        <span class="progress-label" :style="{ color: card.color }">
          {{ Math.round(card.percentage) }}%
        </span>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePilotStore } from '../../../../stores/pilot';
import { useRollingSum } from '../../../../composables/useRollingSum';
import BaseCard from '~/components/common/BaseCard.vue';

const pilotStore = usePilotStore();
const { rollingSum } = useRollingSum(pilotStore.flightHours);
const todayDate = computed(() => new Date(pilotStore.today));

const limitCards = computed(() =>
  [
    {
      period: 'Daily',
      limit: pilotStore.limits.daily,
      windowDays: 1,
      currentHours: rollingSum(todayDate.value, 1)[7]?.value ?? 0,
    },
    {
      period: 'Weekly',
      limit: pilotStore.limits.weekly,
      windowDays: 7,
      currentHours: rollingSum(todayDate.value, 7)[7]?.value ?? 0,
    },
    {
      period: 'Monthly',
      limit: pilotStore.limits.monthly,
      windowDays: 30,
      currentHours: rollingSum(todayDate.value, 30)[7]?.value ?? 0,
    },
    {
      period: 'Annual',
      limit: pilotStore.limits.annual,
      windowDays: 365,
      currentHours: rollingSum(todayDate.value, 365)[7]?.value ?? 0,
    },
  ].map((card) => {
    const percentage = (card.currentHours / card.limit) * 100;

    const currentHours = Math.ceil(card.currentHours * 10) / 10;

    const color =
      percentage >= 100 ? '#E24B4A' : percentage >= 80 ? '#EF9F27' : '#1D9E75';
    return {
      ...card,
      currentHours,
      percentage: Math.min(percentage, 100),
      color,
    };
  }),
);
</script>

<style lang="scss" scoped>
.limit-cards-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (min-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.limit-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .card-period {
    font-size: 13px;
    color: v.$color-text-sec;
    margin-bottom: 0.5rem;
  }

  .card-hours {
    font-size: 16px;
    font-weight: 700;
    color: v.$color-navy;
    margin-bottom: 0.8rem;
  }

  .progress-bar-wrapper {
    width: 90%;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .progress-bar-container {
    flex: 1;
    height: 10px;
    background-color: #e2e8f0;
    border-radius: 5px;
    overflow: hidden;
  }
  .progress-bar {
    height: 100%;
    border-radius: 5px;
    transition: width 0.4s ease;
    min-width: 4px;
  }

  .progress-label {
    font-size: 11px;
    font-weight: 600;
    min-width: 34px;
    text-align: left;
    flex-shrink: 0;
  }
}
</style>
