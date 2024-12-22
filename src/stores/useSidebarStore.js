import { defineStore } from 'pinia';

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    selectedItem: 'home',
    isCreativeOpen: true,
    isKnowledgeOpen: true,
    isChatOpen: false, 
  }),
  actions: {
    selectItem(item) {
      this.selectedItem = item;
    },
    toggleCreative() {
      this.isCreativeOpen = !this.isCreativeOpen;
    },
    toggleKnowledge() {
      this.isKnowledgeOpen = !this.isKnowledgeOpen;
    },
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
    },
  },
});
