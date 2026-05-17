<template>
  <NuxtLayout name="default">
    <div class="home-dashboard">
      <UpcomingFlight />
      <LatestNews />
      <HoursToLimit />
      <DocumentsList />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import UpcomingFlight from '~/components/home/UpcomingFlight.vue';
import LatestNews from '~/components/home/LatestNews.vue';
import HoursToLimit from '~/components/home/HoursToLimit/HoursToLimit.vue';
import DocumentsList from '~/components/home/DocumentsList.vue';
</script>

<style lang="scss" scoped>
.home-dashboard {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
}
</style>
