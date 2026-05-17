<script setup lang="ts">
import { FileText } from 'lucide-vue-next';
import { usePilotStore } from '../../../stores/pilot';
import { useDocumentExpiry } from '../../../composables/useDocumentExpiry';
import BaseCard from '~/components/common/BaseCard.vue';
import BadgeStatus from '~/components/common/BadgeStatus.vue';

const pilotStore = usePilotStore();

const getExpiry = (doc: any) => {
  const { status, daysUntilExpiry } = useDocumentExpiry(doc, pilotStore.today);
  return { status: status.value, daysUntilExpiry: daysUntilExpiry.value };
};
</script>

<template>
  <BaseCard class="documents-list-card">
    <h3>My Documents</h3>
    <ul class="documents-list">
      <li
        v-for="doc in pilotStore.documents"
        :key="doc.id"
        class="document-item"
      >
        <div class="document-info">
          <FileText class="doc-icon" />
          <span class="doc-name">{{ doc.label }}</span>
        </div>
        <BadgeStatus :status="getExpiry(doc).status">
          {{
            getExpiry(doc).daysUntilExpiry < 0
              ? 'Expired'
              : `${getExpiry(doc).daysUntilExpiry} days`
          }}
        </BadgeStatus>
      </li>
    </ul>
  </BaseCard>
</template>

<style lang="scss" scoped>
.documents-list-card {
  h3 {
    font-size: 16px;
    color: v.$color-text-sec;
    margin-bottom: 0.8rem;
  }
}
.documents-list {
  list-style: none;
  padding: 0;
}
.document-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
}
.document-info {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  .doc-icon {
    width: 20px;
    height: 20px;
    color: v.$color-text-sec;
  }
  .doc-name {
    font-size: 14px;
    font-weight: 500;
    color: v.$color-navy;
  }
}
</style>
