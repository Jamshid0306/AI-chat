<script setup>
import { ref, onMounted } from "vue";
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
import "./aside.scss";

const selectedItem = ref(localStorage.getItem("selectedPath") || "Home");
const isCreativeOpen = ref(true);
const isKnowledgeOpen = ref(true);

function selectItem(item) {
  selectedItem.value = item;
  localStorage.setItem("selectedPath", item);
}

function toggleCreative() {
  isCreativeOpen.value = !isCreativeOpen.value;
}

function toggleKnowledge() {
  isKnowledgeOpen.value = !isKnowledgeOpen.value;
}

onMounted(() => {
  const storedItem = localStorage.getItem("selectedPath");
  if (storedItem) {
    selectedItem.value = storedItem;
  }
});
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
              <Plus :size="25" />
              <Down :size="25" />
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
