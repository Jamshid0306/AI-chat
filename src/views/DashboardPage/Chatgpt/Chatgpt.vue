<script setup>
import { ref } from "vue";
import "./chatgpt.scss";

const userMessage = ref("");
const chatMessages = ref([]);

function sendMessage() {
  if (userMessage.value.trim()) {
    chatMessages.value.push({ type: "user", message: userMessage.value });
    userMessage.value = "";
    setTimeout(() => {
      chatMessages.value.push({ type: "bot", message: "This is a response from ChatGPT." });
    }, 1000);
  }
}
</script>

<template>
  <div class="chat-container">
    <div class="chat-header">
      <h3>Chat with ChatGPT</h3>
    </div>
    <div class="chat-body">
      <div class="message-container" v-for="(msg, index) in chatMessages" :key="index">
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
</template>

<style scoped>
.chat-container {
  width: 400px;
  background-color: #f7f7f7;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.chat-header {
  background-color: #007bff;
  color: white;
  padding: 15px;
  text-align: center;
  font-weight: bold;
}

.chat-body {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
}

.message-container {
  margin-bottom: 15px;
}

.message {
  max-width: 80%;
  padding: 10px;
  border-radius: 10px;
  display: inline-block;
}

.message.user {
  background-color: #d7e6fb;
  align-self: flex-end;
}

.message.bot {
  background-color: #f1f1f1;
  align-self: flex-start;
}

.chat-input {
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ddd;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-right: 10px;
}

.chat-input button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.chat-input button:hover {
  background-color: #0056b3;
}
</style>
