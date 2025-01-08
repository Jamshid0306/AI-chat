import { defineStore } from 'pinia';
export const usePeriodStore = defineStore('sidebar', {
  state: () => ({
    selectedPeriod: 'month'
    
  }),
  actions: {
  },
  persist: true,
});
