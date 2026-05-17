<template>
  <header class="app-header">
    <div class="header-left">
      <h2 class="welcome-message">Good morning, {{ pilotStore.pilot?.name }}</h2>
      <div class="total-hours-badge">
        Total: {{ pilotStore.pilot?.totalHours }} hrs
      </div>
    </div>
    <div class="header-right">
      <div class="notification-bell">
        <Bell class="icon" />
        <span v-if="unreadNotifications > 0" class="badge">{{ unreadNotifications }}</span>
      </div>
      <img
        :src="pilotStore.pilot?.avatar || '/images/avatar.png'"
        alt="Pilot Avatar"
        class="pilot-avatar"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Bell } from 'lucide-vue-next';
import { usePilotStore } from '~/stores/pilot';

const pilotStore = usePilotStore();
const unreadNotifications = ref(3); // Mock unread count
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: v.$color-surface;
  box-shadow: v.$shadow-card;
  z-index: 999;
}

.header-left {
  display: flex;
  flex-direction: column;
}

.welcome-message {
  font-size: 18px;
  font-weight: 700;
  color: v.$color-navy;
  margin-bottom: 4px;
}

.total-hours-badge {
  font-size: 12px;
  color: v.$color-text-sec;
  background-color: v.$color-bg;
  padding: 4px 8px;
  border-radius: 12px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notification-bell {
  position: relative;
  .icon {
    width: 24px;
    height: 24px;
    color: v.$color-text-sec;
  }
  .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: v.$color-red;
    color: white;
    font-size: 10px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    @include m.flex-center;
  }
}

.pilot-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
