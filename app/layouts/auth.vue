<template>
  <div class="auth-layout">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: v.$color-bg;
}
</style>
