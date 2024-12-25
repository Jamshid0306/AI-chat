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
      this.saveStateToLocalStorage();
    },
    toggleCreative() {
      this.isCreativeOpen = !this.isCreativeOpen;
      this.saveStateToLocalStorage();
    },
    toggleKnowledge() {
      this.isKnowledgeOpen = !this.isKnowledgeOpen;
      this.saveStateToLocalStorage();
    },
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
      this.saveStateToLocalStorage();
    },
    saveStateToLocalStorage() {
      localStorage.setItem('sidebarState', JSON.stringify({
        selectedItem: this.selectedItem,
        isCreativeOpen: this.isCreativeOpen,
        isKnowledgeOpen: this.isKnowledgeOpen,
        isChatOpen: this.isChatOpen,
      }));
    },
    loadStateFromLocalStorage() {
      const savedState = localStorage.getItem('sidebarState');
      if (savedState) {
        const { selectedItem, isCreativeOpen, isKnowledgeOpen, isChatOpen } = JSON.parse(savedState);
        this.selectedItem = selectedItem || 'home';
        this.isCreativeOpen = isCreativeOpen ?? true;
        this.isKnowledgeOpen = isKnowledgeOpen ?? true;
        this.isChatOpen = isChatOpen ?? false;
      }
    },
  },
  persist: true,
});

const sidebarStore = useSidebarStore();
sidebarStore.loadStateFromLocalStorage();
