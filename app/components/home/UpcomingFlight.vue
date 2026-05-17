<template>
  <BaseCard class="upcoming-flight-card">
    <h3>Upcoming Flight</h3>
    <div v-if="pilotStore.upcomingFlight" class="flight-details">
      <p class="flight-date">{{ pilotStore.upcomingFlight.date }} {{ pilotStore.upcomingFlight.time }}</p>
      <div class="route">
        <span>{{ pilotStore.upcomingFlight.departure.icao }} ({{ pilotStore.upcomingFlight.departure.city }})</span>
        <ArrowRight class="arrow-icon" />
        <span>{{ pilotStore.upcomingFlight.arrival.icao }} ({{ pilotStore.upcomingFlight.arrival.city }})</span>
      </div>
    </div>
    <p v-else>No upcoming flights.</p>
  </BaseCard>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import { usePilotStore } from '~/stores/pilot';
import BaseCard from '~/components/common/BaseCard.vue';

const pilotStore = usePilotStore();
</script>

<style lang="scss" scoped>
.upcoming-flight-card {
  h3 {
    font-size: 16px;
    color: v.$color-text-sec;
    margin-bottom: 0.8rem;
  }
  .flight-details {
    .flight-date {
      font-size: 14px;
      font-weight: 500;
      color: v.$color-navy;
      margin-bottom: 0.5rem;
    }
    .route {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 16px;
      font-weight: 600;
      color: v.$color-navy;

      .arrow-icon {
        width: 20px;
        height: 20px;
        color: v.$color-text-sec;
      }
    }
  }
}
</style>
