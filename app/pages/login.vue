<template>
  <NuxtLayout name="auth">
    <div class="login-container">
      <header class="login-header">
        <img src="/images/susi-air-logo.png" alt="Susi Air Logo" class="susi-air-logo" />
        <h2>Pilot Login</h2>
      </header>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            placeholder="Enter your username"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-input-wrapper">
            <input
              id="password"
              v-model="password"
              :type="passwordVisible ? 'text' : 'password'"
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              class="password-toggle"
              @click="passwordVisible = !passwordVisible"
            >
              <component :is="passwordVisible ? EyeOff : Eye" class="icon" />
            </button>
          </div>
        </div>
        <button type="submit" class="login-button">Sign In</button>
      </form>
      <div class="login-footer">
        <NuxtLink to="mailto:support@susiair.com">Need help? Contact CRD</NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Eye, EyeOff } from 'lucide-vue-next';
import { usePilotStore } from '~/stores/pilot';

const username = ref('');
const password = ref('');
const passwordVisible = ref(false);
const pilotStore = usePilotStore();
const router = useRouter();

const handleLogin = () => {
  if (username.value && password.value) {
    pilotStore.login(username.value);
    router.push('/home');
  } else {
    alert('Please enter username and password.'); // Basic UX feedback
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  background-color: v.$color-surface;
  padding: 2rem;
  border-radius: v.$radius-card;
  box-shadow: v.$shadow-card;
  width: 90%;
  max-width: 380px;
  text-align: center;
}

.login-header {
  margin-bottom: 2rem;
  .susi-air-logo {
    max-width: 150px;
    margin-bottom: 1rem;
  }
  h2 {
    color: v.$color-navy;
  }
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 14px;
    color: v.$color-text-sec;
  }
  input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
  }
}

.password-input-wrapper {
  position: relative;
  input {
    padding-right: 3rem;
  }
  .password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    .icon {
      width: 20px;
      height: 20px;
      color: v.$color-text-sec;
    }
  }
}

.login-button {
  width: 100%;
  padding: 0.8rem;
  background-color: v.$color-red;
  color: white;
  border-radius: v.$radius-btn;
  font-size: 16px;
  font-weight: 600;
  margin-top: 1.5rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: darken(v.$color-red, 10%);
  }
}

.login-footer {
  margin-top: 1.5rem;
  font-size: 14px;
  a {
    color: v.$color-text-sec;
    text-decoration: underline;
  }
}
</style>