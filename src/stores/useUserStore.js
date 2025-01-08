import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
  }),
  actions: {
    setUserName(name) {
      this.name = name;
    },
  },
  persist: true, // Bu yerda persist true qilishingiz kifoya
});
