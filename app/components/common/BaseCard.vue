<template>
  <div class="base-card">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.base-card {
  background-color: v.$color-surface;
  border-radius: v.$radius-card;
  box-shadow: v.$shadow-card;
  padding: 1rem;
}
</style>