import { computed } from 'vue';
import { differenceInDays, parseISO } from 'date-fns';

interface Document {
  expiryDate: string;
}

export function useDocumentExpiry(document: Document, today: string) {
  const expiryDate = computed(() => parseISO(document.expiryDate));
  const todayDate = computed(() => parseISO(today));

  const daysUntilExpiry = computed(() =>
    differenceInDays(expiryDate.value, todayDate.value),
  );

  const status = computed(() => {
    if (daysUntilExpiry.value < 0) {
      return 'expired'; // Red
    } else if (daysUntilExpiry.value <= 30) {
      return 'warning'; // Amber
    } else {
      return 'success'; // Green
    }
  });

  return { daysUntilExpiry, status };
}