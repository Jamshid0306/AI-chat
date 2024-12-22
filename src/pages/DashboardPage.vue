<script setup>
import { ref, onMounted } from 'vue';
import Home from "@/views/DashboardPage/Home/Home.vue";
import Aside from "@/layouts/Aside/Aside.vue";
import Chatgpt from "@/views/DashboardPage/Chatgpt/Chatgpt.vue";

const selectedPath = ref(localStorage.getItem('selectedPath') || 'Home');

onMounted(() => {
  const storedPath = localStorage.getItem('selectedPath') || 'Home';
  selectedPath.value = storedPath;
});

function updatePath(path) {
  selectedPath.value = path;
  console.log('Selected path changed to:', path);
  localStorage.setItem('selectedPath', path);
}
</script>

<template>
  <div class="dashboard">
    <Aside />
    <div class="homev">
      <Home v-if="selectedPath === 'Home'" />
      <Chatgpt v-if="selectedPath === 'chatgpt'" :key="selectedPath" />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  gap: 30px;
  background: #f7f9fc;
}

.homev {
  width: 100%;
  padding: 30px 20px;
}
</style>
