<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useSidebarStore } from "@/stores/useSidebarStore";
import Video from "@/components/icons/Video.vue";
import "./chatgpt.scss";

const store = useSidebarStore();
const userMessage = ref("");
const chatMessages = ref({
  chatgpt: [],
  chatgptimage: [],
  chatgptvideo: [],
  chatgptmusic: [],
});
const isLoading = ref(false);
const apiKey = import.meta.env.VITE_API_KEY;

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function sendMessage() {
  if (userMessage.value.trim()) {
    const selectedChat = store.selectedItem;
    chatMessages.value[selectedChat].push({
      type: "user",
      message: userMessage.value,
      time: getCurrentTime(),
    });
    const messageToSend = userMessage.value;
    userMessage.value = "";
    isLoading.value = true;

    if (selectedChat === "chatgptimage") {
      generateImage(messageToSend);
    } else if (selectedChat === "chatgptvideo") {
      generateVideo(messageToSend);
    } else if (selectedChat === "chatgptmusic") {
      generateMusic(messageToSend);
    } else {
      getChatGptResponse(messageToSend);
    }
    saveChatToLocalStorage();
  }
}

async function getChatGptResponse(userInput) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userInput },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    const botMessage = response.data.choices[0].message.content;
    chatMessages.value[store.selectedItem].push({
      type: "bot",
      message: botMessage,
      time: getCurrentTime(),
    });
    saveChatToLocalStorage();
  } catch {
    chatMessages.value[store.selectedItem].push({
      type: "bot",
      message: "Sorry, something went wrong.",
      time: getCurrentTime(),
    });
  } finally {
    isLoading.value = false;
  }
}

async function generateImage(prompt) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt,
        n: 1,
        size: "512x512",
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    const imageUrl = response.data.data[0].url;
    chatMessages.value[store.selectedItem].push({
      type: "bot",
      message: `Generated image:`,
      image: imageUrl,
      time: getCurrentTime(),
    });
    saveChatToLocalStorage();
  } catch {
    chatMessages.value[store.selectedItem].push({
      type: "bot",
      message: "Image generation failed.",
      time: getCurrentTime(),
    });
  } finally {
    isLoading.value = false;
  }
}

async function generateVideo(prompt) {
  chatMessages.value[store.selectedItem].push({
    type: "bot",
    message: "Video generation is not yet implemented.",
    time: getCurrentTime(),
  });
  saveChatToLocalStorage();
  isLoading.value = false;
}

async function generateMusic(prompt) {
  chatMessages.value[store.selectedItem].push({
    type: "bot",
    message: "Music generation is not yet implemented.",
    time: getCurrentTime(),
  });
  saveChatToLocalStorage();
  isLoading.value = false;
}

function downloadImage(imageUrl) {
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "generated_image.png";
  link.click();
}

function saveChatToLocalStorage() {
  localStorage.setItem("chatMessages", JSON.stringify(chatMessages.value));
  localStorage.setItem("userMessage", userMessage.value);
}

function loadChatFromLocalStorage() {
  const savedChatMessages = localStorage.getItem("chatMessages");
  const savedUserMessage = localStorage.getItem("userMessage");

  if (savedChatMessages) {
    chatMessages.value = JSON.parse(savedChatMessages);
  }
  if (savedUserMessage) {
    userMessage.value = savedUserMessage;
  }
}

onMounted(() => {
  loadChatFromLocalStorage();
});
</script>

<template>
  <section>
    <div v-if="store.selectedItem === 'chatgpt'" class="chatall">
      <div class="chat-container">
        <div class="chat-header">
          <h3>ChatGPT</h3>
        </div>
        <div class="chat-body">
          <div
            class="message-container"
            v-for="(msg, index) in chatMessages.chatgpt"
            :key="index"
          >
            <div :class="['message', msg.type]">
              <span class="time">{{ msg.time }}</span>
              <p v-if="!msg.image">{{ msg.message }}</p>
              <img v-if="msg.image" :src="msg.image" alt="Generated image" />
            </div>
          </div>
          <div v-if="isLoading" class="loading-animation"></div>
        </div>
        <div class="chat-input">
          <input
            v-model="userMessage"
            type="text"
            placeholder="Type your message..."
            @keyup.enter="sendMessage"
          />
          <button @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
    <div v-if="store.selectedItem === 'chatgptimage'" class="chatall">
      <div class="chat-container">
        <div class="chat-header">
          <h3>Image Generator</h3>
        </div>
        <div class="chat-body">
          <div
            class="message-container"
            v-for="(msg, index) in chatMessages.chatgptimage"
            :key="index"
          >
            <div :class="['message', msg.type]">
              <span class="time">{{ msg.time }}</span>
              <p v-if="!msg.image">{{ msg.message }}</p>
              <div v-if="msg.image">
                <div class="download-wr">
                  <button class="download" @click="downloadImage(msg.image)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 15.575q-.2 0-.375-.062T11.3 15.3l-3.6-3.6q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L11 12.15V5q0-.425.288-.712T12 4t.713.288T13 5v7.15l1.875-1.875q.3-.3.713-.288t.712.313q.275.3.288.7t-.288.7l-3.6 3.6q-.15.15-.325.213t-.375.062M6 20q-.825 0-1.412-.587T4 18v-2q0-.425.288-.712T5 15t.713.288T6 16v2h12v-2q0-.425.288-.712T19 15t.713.288T20 16v2q0 .825-.587 1.413T18 20z"
                      />
                    </svg>
                  </button>
                </div>
                <img :src="msg.image" alt="Generated image" />
              </div>
            </div>
          </div>
          <div v-if="isLoading" class="loading-animation"></div>
        </div>
        <div class="chat-input">
          <input
            v-model="userMessage"
            type="text"
            placeholder="Enter image description..."
            @keyup.enter="sendMessage"
          />
          <button @click="sendMessage">Generate</button>
        </div>
      </div>
    </div>
    <div v-if="store.selectedItem === 'chatgptvideo'" class="chatall">
      <div class="chat-container">
        <div class="chat-header">
          <Video :size="30" />
          <h3>Video Generator</h3>
        </div>
        <div class="chat-body">
          <div
            class="message-container"
            v-for="(msg, index) in chatMessages.chatgptvideo"
            :key="index"
          >
            <div :class="['message', msg.type]">
              <span class="time">{{ msg.time }}</span>
              <p>{{ msg.message }}</p>
            </div>
          </div>
          <div v-if="isLoading" class="loading-animation"></div>
        </div>
        <div class="chat-input">
          <input
            v-model="userMessage"
            type="text"
            placeholder="Enter video description..."
            @keyup.enter="sendMessage"
          />
          <button @click="sendMessage">Generate</button>
        </div>
      </div>
    </div>
    <div v-if="store.selectedItem === 'chatgptmusic'" class="chatall">
      <div class="chat-container">
        <div class="chat-header">
          <h3>Music Generator</h3>
        </div>
        <div class="chat-body">
          <div
            class="message-container"
            v-for="(msg, index) in chatMessages.chatgptmusic"
            :key="index"
          >
            <div :class="['message', msg.type]">
              <span class="time">{{ msg.time }}</span>
              <p>{{ msg.message }}</p>
            </div>
          </div>
          <div v-if="isLoading" class="loading-animation"></div>
        </div>
        <div class="chat-input">
          <input
            v-model="userMessage"
            type="text"
            placeholder="Enter music description..."
            @keyup.enter="sendMessage"
          />
          <button @click="sendMessage">Generate</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.loading-animation {
  display: block;
  margin: 1rem auto;
  height: 20px;
  width: 20px;
  border: 4px solid #ddd;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.message {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  animation: slideIn 0.5s ease-out;
}

.time {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.5rem;
}

.message-container {
  display: flex;
  flex-direction: column;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
