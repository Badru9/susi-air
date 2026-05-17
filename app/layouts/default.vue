<template>
  <div class="default-layout">
    <main class="content">
      <slot />
    </main>
  </div>
  <BottomNav />
</template>
<script setup lang="ts">
import BottomNav from '~/components/common/BottomNav.vue';
</script>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 70px;
}
.content {
  flex: 1;
  padding: 1rem;
}
</style>
