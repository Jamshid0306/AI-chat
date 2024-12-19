<script setup>
import RightIcon from "@/components/icons/RightIcon.vue"
import "./nav.scss"
</script>

<template>
    <nav class="nav">
        <div class="nav-container">
            <ul>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Affiliate</a></li>
            </ul>
            <RouterLink to="/" class="logo">
                <h2>ninjachat</h2>
            </RouterLink>
            <button>
                <h4>Dashboard</h4>
                <RightIcon :size="20"/>
            </button>
        </div>
    </nav>
</template>
