<script setup>
import { useBlockStore } from "@/stores/useBlockStore";
import Image from "@/components/icons/Image.vue";
import Video from "@/components/icons/Video.vue";
import File from "@/components/icons/File.vue";
import Chat from "@/components/icons/Chat.vue";
import Music from "@/components/icons/Music.vue";
import Map from "@/components/icons/Map.vue";
import Youtube from "@/components/icons/Youtube.vue";
import Internet from "@/components/icons/Internet.vue";
import PdfIcon from "@/components/icons/PdfIcon.vue";
import RightIcon from "@/components/icons/RightIcon.vue";
import Robot from "@/components/icons/Robot.vue";
import "./home.scss";
import { useSidebarStore } from "@/stores/useSidebarStore";
const store = useSidebarStore();
const blockStore = useBlockStore();
</script>

<template>
  <section class="home">
    <div class="cardai card">
      <h2>Your Personalized AI Workspace</h2>
      <p>
        Experience the next generation of AI-powered creativity and productivity
        tools, all in one seamless workspace.
      </p>
      <div>
        <div class="start">
          <button @click="store.selectedItem = 'chatgpt'">
            Start a new chat
          </button>
        </div>
        <RouterLink class="premium" to="/">
          <button>Upgrade to Premium</button>
        </RouterLink>
      </div>
    </div>
    <div class="cardas card">
      <h3>Smart AI Assistants</h3>
      <p>Chat with different AI personalities for any task</p>
      <div class="cardsw">
        <div class="blocks">
          <div
            class="block"
            v-for="(item, index) in blockStore.blocks"
            :key="'original-' + index"
            @click="store.selectedItem = item.klich"
          >
            <img :src="item.img" :alt="item.title" />
            <h5>{{ item.title }}</h5>
            <p>{{ item.description }}</p>
          </div>
        </div>
        <div class="blocks">
          <div
            class="block"
            v-for="(item, index) in blockStore.blocks"
            :key="'original-' + index"
            @click="store.selectedItem = item.klich"
          >
            <img :src="item.img" :alt="item.title" />
            <h5>{{ item.title }}</h5>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="home-bot">
    <div class="home-bot-top">
      <div class="cardimg card card-bot cardbot">
        <img src="@/assets/images/cardImg.webp" alt="" />
        <div>
          <Image :size="30" />
          <h6>Image Studio</h6>
        </div>
        <p class="podd">Text to stunning visuals</p>
        <button @click="store.selectedItem = 'chatgptimage'">
          <span>Create now</span>
          <RightIcon :size="20" />
        </button>
      </div>
      <div class="cardrob card card-bot cardbot">
        <div class="blocks">
          <div class="gpt">
            <img src="@/assets/images/dashboard/chatgpt-4-mini.jpeg" alt="" />
            <p>GPT-4</p>
          </div>
          <p class="vs">VS</p>
          <div class="gpt">
            <img src="@/assets/images/claude.png" alt="" />
            <p>Claude 3</p>
          </div>
        </div>
        <div class="sms">
          <p>
            The quantum nature of consciousness arises from microtubules in
            neurons,...
          </p>
          <p>
            While intiguing, we should be cautious about quantum theories of
            consciousness...
          </p>
        </div>
        <p class="pod">
          See how different AI models approach the same question
        </p>
        <div>
          <Robot :size="30" />
          <h6>Compare AI Models</h6>
        </div>
        <p class="podd">See how different AIs think</p>
        <button>
          <span>Get started</span>
          <RightIcon :size="20" />
        </button>
      </div>
      <div class="cardvid card card-bot cardbot">
        <video
          autoplay
          loop
          src="https://cdn.photogenius.ai/video-preview.mp4"
        ></video>
        <div>
          <Video :size="30" />
          <h6>Video Studio</h6>
        </div>
        <p class="podd">AI video generation</p>
        <button @click="store.selectedItem = 'chatgptvideo'">
          <span>Create now</span>
          <RightIcon :size="20" />
        </button>
      </div>
    </div>
    <div class="home-bot-bot">
      <div class="cardimg card-bot1 cardbot">
        <div class="icons">
          <File :size="20" />
          <RightIcon :size="20" />
          <Chat :size="20" />
        </div>
        <div>
          <File :size="30" />
          <h6>PDF Chat</h6>
        </div>
        <p class="podd">Chat with any document</p>
        <button>
          <span>Upload PDF</span>
          <RightIcon :size="20" />
        </button>
      </div>
      <div class="cardimg card-bot1 cardbot">
        <div class="text">
          <p>beats</p>
          <p>melody</p>
          <p>track</p>
        </div>
        <div>
          <Music :size="30" />
          <h6>Tune Studio</h6>
        </div>
        <p class="podd">AI music generation</p>
        <button @click="store.selectedItem = 'chatgptmusic'">
          <span>Create now</span>
          <RightIcon :size="20" />
        </button>
      </div>
      <div class="cardimg card-bot1 cardbot">
        <div class="icons">
          <Youtube :size="20" />
          <Internet :size="20" />
          <PdfIcon :size="20" />
        </div>
        <div>
          <Map :size="30" />
          <h6>Mind Maps</h6>
        </div>
        <p class="podd">Visual learning assistant</p>
        <button>
          <span>Create map</span>
          <RightIcon :size="20" />
        </button>
      </div>
    </div>
  </section>
</template>
