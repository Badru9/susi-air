<template>
  <BaseCard class="chart-container">
    <h3>Flight Hours Trend</h3>
    <div class="chart-wrapper">
      <Line :data="chartData" :options="chartOptions" />
    </div>
    <div class="toggle-group">
      <button
        v-for="(option, key) in chartToggleOptions"
        :key="key"
        :class="{ active: activeChartToggle === key }"
        @click="activeChartToggle = key as ChartToggleKey"
      >
        {{ option.label }}
      </button>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import { usePilotStore } from '../../../../stores/pilot';
import { useRollingSum } from '../../../../composables/useRollingSum';
import BaseCard from '~/components/common/BaseCard.vue';
import { addDays, format } from 'date-fns';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
);

type ChartToggleKey = '1w' | '1m' | '3m' | '6m' | '1y';

const CHART_DEFAULT_COLOR = '#162447';

const pilotStore = usePilotStore();
const { rollingSum } = useRollingSum(pilotStore.flightHours);
const todayDate = computed(() => new Date(pilotStore.today));

const activeChartToggle = ref<ChartToggleKey>('1w');

const chartToggleOptions: Record<
  ChartToggleKey,
  { label: string; windowDays: number; limit: number; yMax: number }
> = {
  '1w': {
    label: '1w',
    windowDays: 7,
    limit: pilotStore.limits.weekly,
    yMax: 45,
  },
  '1m': {
    label: '1m',
    windowDays: 30,
    limit: pilotStore.limits.monthly,
    yMax: 125,
  },
  '3m': { label: '3m', windowDays: 90, limit: 300, yMax: 325 },
  '6m': { label: '6m', windowDays: 180, limit: 600, yMax: 625 },
  '1y': {
    label: '1y',
    windowDays: 365,
    limit: pilotStore.limits.annual,
    yMax: 1250,
  },
};

const currentChartData = computed(() => {
  const config = chartToggleOptions[activeChartToggle.value];
  return rollingSum(todayDate.value, config.windowDays);
});

const activeColor = computed(
  () =>
    pilotStore.chartBounds[activeChartToggle.value]?.color ??
    CHART_DEFAULT_COLOR,
);

const chartData = computed(() => {
  const labels = Array.from({ length: 15 }, (_, i) =>
    format(addDays(todayDate.value, i - 7), 'MMM d'),
  );

  const data = currentChartData.value.map((point) => point.value);
  const limit = chartToggleOptions[activeChartToggle.value].limit;
  const color = activeColor.value;

  return {
    labels,
    datasets: [
      {
        label: 'Flight Hours',
        backgroundColor: color,
        borderColor: color,
        data,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: color,
      },
      {
        label: 'Limit',
        backgroundColor: 'red',
        borderColor: 'red',
        data: Array(15).fill(limit),
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };
});

const chartOptions = computed(() => {
  const yMax = chartToggleOptions[activeChartToggle.value].yMax;
  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: yMax,
        ticks: { stepSize: yMax / 5 },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label(context: any) {
            let label = context.dataset.label ?? '';
            if (label) label += ': ';
            if (context.parsed.y !== null) {
              label +=
                new Intl.NumberFormat('en-US', {
                  style: 'decimal',
                  maximumFractionDigits: 1,
                }).format(context.parsed.y) + ' hrs';
            }
            return label;
          },
        },
      },
    },
  };
});
</script>

<style lang="scss" scoped>
.chart-container {
  margin-top: 1.5rem;

  h3 {
    font-size: 16px;
    color: v.$color-text-sec;
    margin-bottom: 0.8rem;
  }
}

.chart-wrapper {
  position: relative;
  height: 200px;
  width: 100%;
  margin-bottom: 1rem;
}

.toggle-group {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;

  button {
    background: v.$color-bg;
    color: v.$color-text-sec;
    padding: 0.4rem 0.8rem;
    border-radius: v.$radius-btn;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid transparent;

    &.active {
      background: v.$color-navy;
      color: v.$color-surface;
      border-color: v.$color-navy;
    }

    &:hover:not(.active) {
      border-color: v.$color-navy;
    }
  }
}
</style>
