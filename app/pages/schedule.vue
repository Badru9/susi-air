<template>
  <NuxtLayout name="default">
    <div class="schedule-page">
      <CalendarGrid />
      <DutyLegend />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import CalendarGrid from '~/components/schedule/CalendarGrid.vue';
import DutyLegend from '~/components/schedule/DutyLegend.vue';
</script>

<style lang="scss" scoped>
.schedule-page {
  padding: 1rem;
}
</style>
