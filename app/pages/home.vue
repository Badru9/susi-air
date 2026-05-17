<template>
  <NuxtLayout name="default">
    <div class="home-dashboard">
      <AppHeader title="Welcome Back, Pilot!" />
      <UpcomingFlight />
      <LatestNews />
      <HoursToLimit />
      <DocumentsList />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import AppHeader from '~/components/common/AppHeader.vue';
import DocumentsList from '~/components/home/DocumentsList.vue';
import HoursToLimit from '~/components/home/HoursToLimit/HoursToLimit.vue';
import LatestNews from '~/components/home/LatestNews.vue';
import UpcomingFlight from '~/components/home/UpcomingFlight.vue';
</script>

<style lang="scss" scoped>
.home-dashboard {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
}
</style>
