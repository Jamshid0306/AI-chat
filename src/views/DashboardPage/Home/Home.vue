<script setup>
import "./home.scss";

function startNewChat() {
  localStorage.setItem("selectedPath", "chatgpt");
}
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
          <button @click="startNewChat">Start a new chat</button>
        </div>
        <RouterLink class="premium" to="/">
          <button>Upgrade to Premium</button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
