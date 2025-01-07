<script setup>
import { useSidebarStore } from "@/stores/useSidebarStore";
import Home from "@/views/DashboardPage/Home/Home.vue";
import Aside from "@/layouts/Aside/Aside.vue";
import Chatgpt from "@/views/DashboardPage/Chatgpt/Chatgpt.vue";
import "./media.scss";

const store = useSidebarStore();
</script>

<template>
  <div class="dashboard">
    <Aside />
    <div class="homev">
      <Home v-if="store.selectedItem === 'home'" />
      <Chatgpt
        v-if="
          store.selectedItem === 'chatgpt' ||
          store.selectedItem === 'chatgptimage' ||
          store.selectedItem === 'chatgptmusic' ||
          store.selectedItem === 'chatgptvideo' ||
          store.selectedItem === 'liama'
        "
      />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  gap: 30px;
  background: #f7f9fc;
  overflow: hidden;
}

.homev {
  margin-left: 290px;
  width: 100%;
  padding: 30px 20px;
}
@media screen and (max-width: 1124px) {
  .dashboard {
    flex-direction: column;
  }
  .homev {
    width: 100%;
    margin-left: 0;
    margin-top: 70px;
  }
}
</style>
