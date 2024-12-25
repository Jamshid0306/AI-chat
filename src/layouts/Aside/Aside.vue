<script setup>
import { useBlockStore } from "@/stores/useBlockStore";
import { useSidebarStore } from "@/stores/useSidebarStore";
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
import Lamp from "@/components/icons/Lamp.vue";
import History from "@/components/icons/History.vue";
import "./aside.scss";
import { ref } from "vue";
const blockStore = useBlockStore();
const store = useSidebarStore();
const isModalOpen = ref(false);

function selectItem(item) {
  store.selectItem(item);
}
function toggleBlockSelection(blockId) {
  const block = blockStore.blocks.find((b) => b.id === blockId);
  if (block?.title === "ChatGPT-4o" || block?.title === "ChatGPT-4o Mini") {
    store.selectItem("chatgpt");
  }


  isModalOpen.value = false
  blockStore.toggleSelection(blockId);
}

function toggleCreative() {
  store.toggleCreative();
}

function toggleKnowledge() {
  store.toggleKnowledge();
}

function toggleChat() {
  isModalOpen.value = !isModalOpen.value;
}
</script>

<template>
  <aside class="sidebar">
    <div class="logo">ninjachat</div>
    <nav>
      <ul>
        <li
          :class="{ active: store.selectedItem === 'home' }"
          @click="store.selectedItem = 'home'"
        >
          <RouterLink to="/dashboard" class="link">
            <Home :size="25" />
            Home
          </RouterLink>
        </li>

        <li class="section-header" @click="toggleChat">
          <RouterLink to="/dashboard" class="chatlink">
            <div>Chat</div>
            <div>
              <Plus :size="25" />
              <component :is="store.isChatOpen ? Up : Down" :size="25" />
            </div>
          </RouterLink>
        </li>

        <transition name="fade">
          <ul v-if="store.isChatOpen">
            <li
              :class="{ active: store.selectedItem === 'AI Playground' }"
              @click="selectItem('AI Playground')"
            >
              <RouterLink to="/dashboard" class="link">
                <Lamp :size="25" />
                AI Playground
              </RouterLink>
            </li>
            <li
              :class="{ active: store.selectedItem === 'AI Models' }"
              @click="selectItem('AI Models')"
            >
              <RouterLink to="/dashboard" class="link">
                <Map :size="25" />
                AI Models
              </RouterLink>
            </li>
            <li
              :class="{ active: store.selectedItem === 'Recent Chats' }"
              @click="selectItem('Recent Chats')"
            >
              <RouterLink to="/dashboard" class="link">
                <History :size="20" />
                Recent Chats
              </RouterLink>
            </li>
          </ul>
        </transition>

        <li class="section-header" @click="toggleCreative">
          Creative
          <component :is="store.isCreativeOpen ? Up : Down" :size="25" />
        </li>
        <transition name="fade">
          <ul v-if="store.isCreativeOpen">
            <li
              :class="{ active: store.selectedItem === 'chatgptimage' }"
              @click="selectItem('chatgptimage')"
            >
              <RouterLink to="/dashboard" class="link">
                <Image :size="25" />
                AI Images
              </RouterLink>

            </li>
            <li
              :class="{ active: store.selectedItem === 'chatgptmusic' }"
              @click="selectItem('chatgptmusic')"
            >
              <RouterLink to="/dashboard" class="link">
                <Music :size="25" />
                AI Music
              </RouterLink>
            </li>
            <li
              :class="{ active: store.selectedItem === 'chatgptvideo' }"
              @click="selectItem('chatgptvideo')"
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
          <component :is="store.isKnowledgeOpen ? Up : Down" :size="25" />
        </li>
        <transition name="fade">
          <ul v-if="store.isKnowledgeOpen">
            <li
              :class="{ active: store.selectedItem === 'AI Mindmaps' }"
              @click="selectItem('AI Mindmaps')"
            >
              <RouterLink to="/dashboard" class="link">
                <Map :size="25" />
                AI Mindmaps
              </RouterLink>
            </li>
            <li
              :class="{ active: store.selectedItem === 'Chat with PDF' }"
              @click="selectItem('Chat with PDF')"
            >
              <RouterLink to="/dashboard" class="link">
                <Pdf :size="25" />
                Chat with PDF
              </RouterLink>
            </li>
            <li
              :class="{ active: store.selectedItem === 'Writing Library' }"
              @click="selectItem('Writing Library')"
            >
              <RouterLink to="/dashboard" class="link">
                <Library :size="25" />
                Writing Library
              </RouterLink>
            </li>
            <li
              :class="{ active: store.selectedItem === 'Artifacts' }"
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

  <div
    v-if="isModalOpen"
    class="modal-overlay"
    @click.self="isModalOpen = false"
  >
    <div class="modal-content">
      <div class="blocks-container">
        <div
          v-for="block in blockStore.blocks"
          :key="block.id"
          class="block"
          :class="{ selected: block.selected }"
          @click="toggleBlockSelection(block.id)"
        >
          <img :src="block.img" :alt="block.title" />
          <div>
            <h4>{{ block.title }}</h4>
            <p>{{ block.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

