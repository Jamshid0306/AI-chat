<script setup>
import { useSidebarStore } from "@/stores/useSidebarStore";
import "./home.scss";

const store = useSidebarStore();

import Image from "@/components/icons/Image.vue";
import RightIcon from "@/components/icons/RightIcon.vue";
import chatgpt4oImg from "@/assets/images/dashboard/chatgpt-4o.png";
import chatgpt4oMiniImg from "@/assets/images/dashboard/chatgpt-4-mini.jpeg";
import claudeImg from "@/assets/images/claude.png";
import liamaImg from "@/assets/images/dashboard/liama.png";
import perplexityAiImg from "@/assets/images/dashboard/perplexity-ai.png";
import mistralImg from "@/assets/images/dashboard/mistral.png";
import geminiImg from "@/assets/images/gemini.png";
import groqImg from "@/assets/images/dashboard/groq.png";
import o1Img from "@/assets/images/dashboard/o1.png";

const blocks = [
  {
    img: chatgpt4oImg,
    title: "ChatGPT-4o",
    description: "Best for creative writing and coding",
  },
  {
    img: chatgpt4oMiniImg,
    title: "ChatGPT-4o Mini",
    description: "Faster responses for quick tasks",
  },
  {
    img: claudeImg,
    title: "Claude 3 Opus",
    description: "Exceptional at analysis and research",
  },
  {
    img: claudeImg,
    title: "Claude 3.5 Sonnet",
    description: "Great balance of speed and intelligence",
  },
  {
    img: liamaImg,
    title: "Llama 3",
    description: "Open source, runs on your device",
  },
  {
    img: liamaImg,
    title: "Llama 3.1 (Pro)",
    description: "Enhanced version with better accuracy",
  },
  {
    img: perplexityAiImg,
    title: "Perplexity AI",
    description: "Real-time info and web search",
  },
  {
    img: mistralImg,
    title: "Mistral Large",
    description: "Fast and reliable responses",
  },
  {
    img: geminiImg,
    title: "Gemini 1.5 Pro",
    description: "Excellent at visual understanding",
  },
  {
    img: groqImg,
    title: "Groq",
    description: "Lightning-fast processing speed",
  },
  {
    img: o1Img,
    title: "O1",
    description: "Optimized for business tasks",
  },
];
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
      <div class="blocks">
        <div
          class="block"
          v-for="(item, index) in blocks"
          :key="'original-' + index"
        >
          <img :src="item.img" :alt="item.title" />
          <h5>{{ item.title }}</h5>
          <p>{{ item.description }}</p>
        </div>
        <div
          class="block"
          v-for="(item, index) in blocks"
          :key="'duplicate-' + index"
        >
          <img :src="item.img" :alt="item.title" />
          <h5>{{ item.title }}</h5>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
  <section class="home-bot">
    <div class="cardimg card card-bot">
      <img src="@/assets/images/cardImg.webp" alt="" />
      <div>
        <Image :size="30" />
        <h6>Image Studio</h6>
        <p>Text to stunning visuals</p>
        <button>
          <span>Create now</span>
          <RightIcon :size="30" />
        </button>
      </div>
    </div>
  </section>
</template>
