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
  liama: []
});
const isLoading = ref(false);
const openAiKey = import.meta.env.VITE_API_KEY;
const liamaKey = import.meta.env.VITE_LIAMA_API_KEY;

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function sendMessage() {
  if (userMessage.value.trim()) {
    const selectedChat = store.selectedItem;
    if (!chatMessages.value[selectedChat]) {
      chatMessages.value[selectedChat] = [];
    }
    chatMessages.value[selectedChat].push({
      type: "user",
      message: userMessage.value,
      time: getCurrentTime()
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
    } else if (selectedChat === "liama") {
      getLiamaResponse(messageToSend);
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
          { role: "user", content: userInput }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${openAiKey}`,
          "Content-Type": "application/json"
        }
      }
    );
    const botMessage = response.data.choices[0].message.content;
    chatMessages.value[store.selectedItem].push({
      type: "bot",
      message: botMessage,
      time: getCurrentTime()
    });
    saveChatToLocalStorage();
  } catch {
    chatMessages.value[store.selectedItem].push({
      type: "bot",
      message: "Sorry, something went wrong.",
      time: getCurrentTime()
    });
  } finally {
    isLoading.value = false;
  }
}

async function getLiamaResponse(userInput) {
  try {
    const response = await axios.post(
      "https://meta-llama-2-ai.p.rapidapi.com/",
      {
        model: "meta-llama/Llama-2-70b-chat-hf",
        messages: [{ role: "user", content: userInput }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "meta-llama-2-ai.p.rapidapi.com",
          "x-rapidapi-key": liamaKey
        }
      }
    );
    const botMessage = response.data.choices[0].message.content;
    chatMessages.value[store.selectedItem].push({
      type: "bot",
      message: botMessage,
      time: getCurrentTime()
    });
    saveChatToLocalStorage();
  } catch {
    chatMessages.value[store.selectedItem].push({
      type: "bot",
      message: "Sorry, something went wrong.",
      time: getCurrentTime()
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
        size: "512x512"
      },
      {
        headers: {
          Authorization: `Bearer ${openAiKey}`,
          "Content-Type": "application/json"
        }
      }
    );
    const imageUrl = response.data.data[0].url;
    chatMessages.value[store.selectedItem].push({
      type: "bot",
      message: `Generated image:`,
      image: imageUrl,
      time: getCurrentTime()
    });
    saveChatToLocalStorage();
  } catch {
    chatMessages.value[store.selectedItem].push({
      type: "bot",
      message: "Image generation failed.",
      time: getCurrentTime()
    });
  } finally {
    isLoading.value = false;
  }
}

async function generateVideo(prompt) {
  chatMessages.value[store.selectedItem].push({
    type: "bot",
    message: "Video generation is not yet implemented.",
    time: getCurrentTime()
  });
  saveChatToLocalStorage();
  isLoading.value = false;
}

async function generateMusic(prompt) {
  chatMessages.value[store.selectedItem].push({
    type: "bot",
    message: "Music generation is not yet implemented.",
    time: getCurrentTime()
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
    <div v-if="store.selectedItem === 'liama'" class="chatall">
      <div class="chat-container">
        <div class="chat-header">
          <h3>Liama</h3>
        </div>
        <div class="chat-body">
          <div
            class="message-container"
            v-for="(msg, index) in chatMessages.liama"
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
                    Download
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
