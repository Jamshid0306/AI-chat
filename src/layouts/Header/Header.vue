<script setup>
import RIghtArrow from "@/components/icons/RIghtArrow.vue";

import "./header.scss"

</script>
<template>
    <header class="header">
        <div class="container">
            <h2 class="info">Trusted by 130,164+ users worldwide</h2>
            <h1>
                Your All-in-One <br>
                <span>AI Assistant</span>
            </h1>
            <p>Write, create, and chat with the world's best AI tools — all in one place.
                <br> <span>Save over $600/year</span> compared to buying separate subscriptions.
            </p>
            <button>
                <h4>Start for Free</h4>
                <RIghtArrow :size="20" />
            </button>
            <h6>Includes Premium Access To</h6>
            <div class="chats">
                <div class="chat"><img class="openai" src="@/assets/images/openai.webp" alt=""> <h3>ChatGPT-4</h3></div>
                <div class="chat"><img class="claude" src="@/assets/images/claude.png" alt=""> <h3>Claude</h3></div>
                <div class="chat"><img class="gemini" src="@/assets/images/gemini.png" alt=""> <h3>Gemini</h3></div>



            </div>
        </div>
    </header>
</template>