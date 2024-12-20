<script setup>
import { onMounted, ref } from "vue";

import "./tools.scss"

const tools = ref([
    { title: "Conclusion Writer", description: "Create impactful conclusions for essays or articles.", icon: "https://api.iconify.design/arcticons:writer.svg" },
    { title: "Professional Email Drafter", description: "Compose effective emails for various business contexts.", icon: "https://api.iconify.design/fluent:drafts-16-regular.svg" },
    { title: "Attention Grabber", description: "Create engaging hooks for different audiences and styles.", icon: "https://api.iconify.design/octicon:grabber.svg" },
    { title: "Essay Outliner", description: "Create structured outlines for essays and papers.", icon: "https://api.iconify.design/material-symbols:ad-group-outline-rounded.svg" },
    { title: "Context-Aware Thesaurus", description: "Find context-appropriate synonyms and antonyms.", icon: "https://api.iconify.design/mdi:application-parentheses.svg" },
]);

onMounted(() => {
    const track = document.querySelector(".carousel-track");

    track.animate(
        [
            { transform: "translateX(0)" },
            { transform: "translateX(-50%)" },
        ],
        {
            duration: 20000,
            iterations: Infinity,
            easing: "linear",
        }
    );
});
</script>

<template>
    <div class="tools-carousel">
        <h1 class="tools-title">Powerful AI Writing Tools</h1>
        <p class="tools-subtitle">Enhance your writing with our suite of AI-powered tools</p>
        <div class="carousel-wrapper">
            <div class="carousel-track">
                <div class="tool-card" v-for="(tool, index) in tools" :key="index">
                    <div class="icon-container">
                        <img :src="tool.icon" alt="Tool Icon" class="tool-icon" />
                    </div>
                    <h2>{{ tool.title }}</h2>
                    <p>{{ tool.description }}</p>
                </div>
                <div class="tool-card" v-for="(tool, index) in tools" :key="'dup-' + index">
                    <div class="icon-container">
                        <img :src="tool.icon" alt="Tool Icon" class="tool-icon" />
                    </div>
                    <h2>{{ tool.title }}</h2>
                    <p>{{ tool.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
