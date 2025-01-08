<script setup>
import "./main.scss";
</script>
<template>
  <header class="header">
    <div class="container">
      <p class="header-text">Holiday Sale: 60% Off Forever</p>
      <h1 class="header-title">Unlock the Full Power of AI</h1>
      <span class="header-txt"
        >Access ChatGPT, Claude, Perplexity, Stable Diffusion, and
        more—all-in-one</span
      >
      <div class="chats">
        <div class="chat">
          <img class="openai" src="@/assets/images/openai.webp" alt="" />
          <h3>ChatGPT-4</h3>
        </div>
        <div class="chat">
          <img class="claude" src="@/assets/images/claude.png" alt="" />
          <h3>Claude</h3>
        </div>
        <div class="chat">
          <img class="gemini" src="@/assets/images/gemini.png" alt="" />
          <h3>Gemini</h3>
        </div>
      </div>
    </div>
  </header>
</template>
