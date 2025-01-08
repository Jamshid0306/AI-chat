<script setup>
import RightIcon from "@/components/icons/RightIcon.vue";
import "./nav.scss";
</script>

<template>
  <nav class="nav">
    <div class="nav-container">
      <ul>
        <li><RouterLink to="/pricing">Pricing</RouterLink></li>
        <li><RouterLink to="/">Blog</RouterLink></li>
        <li><RouterLink to="/">Affiliate</RouterLink></li>
      </ul>
      <RouterLink to="/" class="logo">
        <h2>ninjachat</h2>
      </RouterLink>
      <RouterLink to="/dashboard">
        <button>
          <h4>Dashboard</h4>
          <RightIcon :size="20" />
        </button>
      </RouterLink>
    </div>
  </nav>
</template>
