<script setup>
import { ref } from "vue";
import axios from "axios";
import "./chatgpt.scss";

const userMessage = ref("");
const chatMessages = ref([]);
const apiKey = import.meta.env.VITE_API_KEY;
console.log("API Key:", apiKey); // API kalitni konsolga chiqarish

function sendMessage() {
  if (userMessage.value.trim()) {
    chatMessages.value.push({ type: "user", message: userMessage.value });
    const messageToSend = userMessage.value; // Foydalanuvchi xabarini saqlash
    userMessage.value = "";
    getChatGptResponse(messageToSend); // Xabarni yuborish
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

    console.log("API Response:", response); // API javobini konsolga chiqarish
    const botMessage = response.data.choices[0].message.content;
    chatMessages.value.push({ type: "bot", message: botMessage });
  } catch (error) {
    console.error("Error fetching ChatGPT response:", error);
    chatMessages.value.push({
      type: "bot",
      message: "Sorry, something went wrong.",
    });
  }
}
</script>

<template>
  <div class="chatall">
    <div class="chat-container">
      <div class="chat-header">
        <h3>Chat with ChatGPT</h3>
      </div>
      <div class="chat-body">
        <div
          class="message-container"
          v-for="(msg, index) in chatMessages"
          :key="index"
        >
          <div :class="['message', msg.type]">
            <p>{{ msg.message }}</p>
          </div>
        </div>
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
</template>
