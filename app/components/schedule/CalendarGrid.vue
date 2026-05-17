<template>
  <BaseCard class="calendar-grid">
    <div class="calendar-header">
      <button @click="scheduleStore.prevMonth()">
        <ChevronLeft />
      </button>
      <h4>{{ $formatDate(scheduleStore.currentMonth, 'MMMM yyyy') }}</h4>
      <button @click="scheduleStore.nextMonth()">
        <ChevronRight />
      </button>
    </div>
    <div class="weekdays">
      <span v-for="day in weekDays" :key="day">{{ day }}</span>
    </div>
    <div class="days-grid">
      <div
        v-for="(day, index) in daysInMonth"
        :key="index"
        class="day-cell"
        :class="{
          'is-today': day.isToday,
          'is-current-month': day.isCurrentMonth,
          'has-duty': day.dutyCode,
        }"
        @click="handleDayClick(day)"
      >
        <span class="day-number">{{ day.date.getDate() }}</span>
        <span
          v-if="day.dutyCode"
          class="duty-code"
          :style="{ backgroundColor: getDutyColor(day.dutyCode) }"
          >{{ day.dutyCode }}</span
        >
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import BaseCard from '~/components/common/BaseCard.vue';
import { useCalendar } from '../../../composables/useCalendar';
import { useScheduleStore } from '../../../stores/schedule';
const { $formatDate } = useNuxtApp();

const scheduleStore = useScheduleStore();
const { weekDays, daysInMonth } = useCalendar(
  scheduleStore.currentMonthDate,
  scheduleStore.schedule,
  new Date('2026-05-17'),
);

const getDutyColor = (dutyCode: string) => {
  const colors: Record<string, string> = {
    DTY: '#0E2138',
    RLV: '#22C5E8',
    SCK: '#E63757',
    TRV: '#F59E0B',
    TRX: '#8B5CF6',
    ADM: '#6B7280',
    FER: '#1FBF8F',
    MED: '#EC4899',
    REC: '#F97316',
    ULV: '#D1D5DB',
  };
  return colors[dutyCode] || 'transparent';
};

const handleDayClick = (day: any) => {
  if (day.isCurrentMonth) {
    alert('Detail page coming soon for ' + $formatDate(day.date));
  }
};
</script>

<style lang="scss" scoped>
.calendar-grid {
  padding: 1rem;

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h4 {
      font-size: 18px;
      font-weight: 600;
      color: v.$color-navy;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      color: v.$color-navy;
      padding: 0.5rem;

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }

  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-size: 12px;
    color: v.$color-text-sec;
    margin-bottom: 0.5rem;

    span {
      padding: 0.5rem 0;
    }
  }

  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;

    .day-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 48px;
      padding: 0.3rem;
      font-size: 14px;
      font-weight: 500;
      color: v.$color-text-sec;
      border-radius: 4px;
      cursor: pointer;
      position: relative;

      &.is-current-month {
        color: v.$color-navy;
      }

      &.is-today {
        background-color: v.$color-bg;
        font-weight: 700;
      }

      &.has-duty {
        .day-number {
          color: v.$color-surface;
        }
      }

      .day-number {
        z-index: 1;
      }

      .duty-code {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: white;
        border-radius: 4px;
        opacity: 0.8; /* Subtle overlay */
        z-index: 0;
      }
    }
  }
}
</style>
