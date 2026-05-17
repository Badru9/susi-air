<template>
  <nav class="bottom-nav">
    <NuxtLink
      v-for="item in navItems"
      :key="item.name"
      :to="item.to"
      class="nav-item"
      :class="{ active: $route.path === item.to }"
    >
      <component :is="item.icon" class="nav-icon" />
      <span class="nav-label">{{ item.name }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Home, Calendar, Book, MoreHorizontal } from 'lucide-vue-next'; // Assume lucide-vue-next is installed
import { usePilotStore } from '~/stores/pilot';

const pilotStore = usePilotStore();

const navItems = [
  { name: 'Home', icon: Home, to: '/home' },
  { name: 'Schedule', icon: Calendar, to: '/schedule' },
  { name: 'Logbook', icon: Book, to: '/logbook' },
  { name: 'More', icon: MoreHorizontal, to: '/more' }, // /more will be a placeholder for now
];
</script>

<style lang="scss" scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  background-color: v.$color-surface;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
  z-index: 1000;
}

.nav-item {
  @include m.flex-center;
  flex-direction: column;
  color: v.$color-text-sec;
  transition: color 0.3s ease;

  &.active {
    color: v.$color-navy;
  }

  .nav-icon {
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
  }

  .nav-label {
    font-size: 12px;
    font-weight: 500;
  }
}
</style>
