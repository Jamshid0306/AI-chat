<script setup>
import { ref } from "vue";
import Home from "@/components/icons/Home.vue";
import Artifact from "@/components/icons/Artifact.vue";
import Chat from "@/components/icons/Chat.vue";
import Image from "@/components/icons/Image.vue";
import Library from "@/components/icons/Library.vue";
import Map from "@/components/icons/Map.vue";
import Music from "@/components/icons/Music.vue";
import Pdf from "@/components/icons/Pdf.vue";
import Video from "@/components/icons/Video.vue";
import Up from "@/components/icons/Up.vue";
import Down from "@/components/icons/Down.vue";
import Plus from "@/components/icons/Plus.vue";

const selectedItem = ref("Home");
const isCreativeOpen = ref(true);
const isKnowledgeOpen = ref(true);

function selectItem(item) {
  selectedItem.value = item;
}

function toggleCreative() {
  isCreativeOpen.value = !isCreativeOpen.value;
}

function toggleKnowledge() {
  isKnowledgeOpen.value = !isKnowledgeOpen.value;
}
</script>

<template>
  <aside class="sidebar">
    <div class="logo">ninjachat</div>
    <nav>
      <ul>
        <li
          :class="{ active: selectedItem === 'Home' }"
          @click="selectItem('Home')"
        >
          <RouterLink to="/dashboard" class="link">
            <Home :size="25" />
            Home
          </RouterLink>
        </li>
        <li
          :class="{ active: selectedItem === 'Chat' }"
          @click="selectItem('Chat')"
        >
          <RouterLink to="/dashboard" class="link chatlink">
            <div>
              <Chat :size="25" />
              Chat
            </div>
            <div>
              <Plus :size="25"/>
              <Down :size="25"/>
            </div>
          </RouterLink>
        </li>
        <li class="section-header" @click="toggleCreative">
          Creative
          <component :is="isCreativeOpen ? Up : Down" :size="25" />
        </li>
        <transition name="fade">
          <ul v-if="isCreativeOpen">
            <li
              :class="{ active: selectedItem === 'AI Images' }"
              @click="selectItem('AI Images')"
            >
              <RouterLink to="/dashboard" class="link">
                <Image :size="25" />
                AI Images
              </RouterLink>
            </li>
            <li
              :class="{ active: selectedItem === 'AI Music' }"
              @click="selectItem('AI Music')"
            >
              <RouterLink to="/dashboard" class="link">
                <Music :size="25" />
                AI Music
              </RouterLink>
            </li>
            <li
              :class="{ active: selectedItem === 'AI Video' }"
              @click="selectItem('AI Video')"
            >
              <RouterLink to="/dashboard" class="link">
                <Video :size="25" />
                AI Video
              </RouterLink>
            </li>
          </ul>
        </transition>

        <li class="section-header" @click="toggleKnowledge">
          Knowledge
          <component :is="isKnowledgeOpen ? Up : Down" :size="25" />
        </li>
        <transition name="fade">
          <ul v-if="isKnowledgeOpen">
            <li
              :class="{ active: selectedItem === 'AI Mindmaps' }"
              @click="selectItem('AI Mindmaps')"
            >
              <RouterLink to="/dashboard" class="link">
                <Map :size="25" />
                AI Mindmaps
              </RouterLink>
            </li>
            <li
              :class="{ active: selectedItem === 'Chat with PDF' }"
              @click="selectItem('Chat with PDF')"
            >
              <RouterLink to="/dashboard" class="link">
                <Pdf :size="25" />
                Chat with PDF
              </RouterLink>
            </li>
            <li
              :class="{ active: selectedItem === 'Writing Library' }"
              @click="selectItem('Writing Library')"
            >
              <RouterLink to="/dashboard" class="link">
                <Library :size="25" />
                Writing Library
              </RouterLink>
            </li>
            <li
              :class="{ active: selectedItem === 'Artifacts' }"
              @click="selectItem('Artifacts')"
            >
              <RouterLink to="/dashboard" class="link">
                <Artifact :size="25" />
                Artifacts
              </RouterLink>
            </li>
          </ul>
        </transition>
      </ul>
    </nav>
    <div class="footer">
      <button class="premium-button">Get Premium</button>
      <div class="user-info">
        <p>FREE</p>
        <p>Jamshid Abdukarimov</p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 240px;
  background-color: #f7f9fc;
  color: #333;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #007bff;
  text-align: center;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  border-radius: 10px;
}

.link {
  text-decoration: none;
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center;
  padding: 10px 10px;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
  width: 100%;
  gap: 10px;
}

li.active .link {
  font-weight: bold;
  background-color: #d7e6fb;
  color: #0056b3;
}

.link:hover {
  background-color: #d7d7d7;
}

.icon {
  margin-right: 10px;
  color: #007bff;
}

.chatlink{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chatlink div{
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-header {
  font-weight: bold;
  text-transform: uppercase;
  color: #555;
  margin: 20px 0 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-size: 17px;
}

.footer {
  margin-top: auto;
  text-align: center;
}

.premium-button {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s;
}

.premium-button:hover {
  background-color: #0056b3;
}

.user-info p {
  margin: 0;
  font-size: 14px;
  color: #555;
}
</style>
