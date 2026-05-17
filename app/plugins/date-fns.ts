import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatDate: (
        date: Date | number | string,
        fmt: string = 'MMMM do, yyyy',
      ) => format(date, fmt, { locale: enUS }),
    },
  };
});
