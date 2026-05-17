<template>
  <div class="latest-news-section">
    <h3>Latest News</h3>
    <div class="news-scroll-wrapper">
      <div class="news-cards-container">
        <BaseCard v-for="item in pilotStore.news" :key="item.id" class="news-card">
          <h4>{{ item.title }}</h4>
          <p class="news-date">{{ item.date }}</p>
          <p class="news-excerpt">{{ item.excerpt }}</p>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePilotStore } from '~/stores/pilot';
import BaseCard from '~/components/common/BaseCard.vue';

const pilotStore = usePilotStore();
</script>

<style lang="scss" scoped>
.latest-news-section {
  h3 {
    font-size: 16px;
    color: v.$color-text-sec;
    margin-bottom: 0.8rem;
  }
}
.news-scroll-wrapper {
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
.news-cards-container {
  display: flex;
  gap: 1rem;
  padding-bottom: 0.5rem;
}
.news-card {
  flex: 0 0 250px;
  h4 {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: v.$color-navy;
  }
  .news-date {
    font-size: 12px;
    color: v.$color-text-sec;
    margin-bottom: 0.5rem;
  }
  .news-excerpt {
    font-size: 13px;
    color: v.$color-text-sec;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>