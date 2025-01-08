<script setup>
import { usePeriodStore } from "@/stores/usePeriodStore";
import TickIcon from "@/components/icons/TickIcon.vue";
import "./pricing.scss";
const store = usePeriodStore();
</script>

<template>
  <section class="pricing">
    <div class="container">
      <div class="pricing-periods">
        <button
          class="month"
          :class="{ selected: store.selectedPeriod === 'month' }"
          @click="store.selectedPeriod = 'month'"
        >
          Monthly
        </button>
        <button
          class="year"
          :class="{ selected: store.selectedPeriod === 'year' }"
          @click="store.selectedPeriod = 'yearly'"
        >
          Yearly
        </button>
      </div>
      <div class="pricing-cards">
        <div class="pricing-card pricing-card1">
          <h3 class="pricing-card-title">Starter</h3>
          <p class="pricing-card-text">Essential AI tools for everyday use</p>
          <h4 class="pricing-card-price">$11 /mo</h4>
          <p
            v-if="store.selectedPeriod === 'yearly'"
            class="pricing-card-podprice"
          >
            Billed yearly at $101
          </p>
          <div class="pricing-card-blocks">
            <TickIcon class="icon" :size="25" />
            <span>1,000 Premium AI Messages</span>
          </div>
          <div class="pricing-card-blocks">
            <TickIcon class="icon" :size="25" />
            <span>30 HD Image Generations</span>
          </div>
          <div class="pricing-card-blocks">
            <TickIcon class="icon" :size="25" />
            <span>5 AI Video Creations</span>
          </div>
          <div class="pricing-card-blocks">
            <TickIcon class="icon" :size="25" />
            <span>All Premium AI Models</span>
          </div>
          <div class="pricing-card-blocks">
            <TickIcon class="icon" :size="25" />
            <span>AI Mindmap Generator</span>
          </div>
          <div class="pricing-card-blocks">
            <TickIcon class="icon" :size="25" />
            <span>Writing Library Access</span>
          </div>
          <RouterLink class="button" to="/pricing">
            <button>Upgrade to Starter</button>
          </RouterLink>
        </div>
        <div class="pricing-card pricing-card2">
          <h3 class="pricing-card-title">Pro</h3>
          <p class="pricing-card-text">Perfect for power users and creators</p>
          <h4 class="pricing-card-price">$18 /mo</h4>
          <p
            class="pricing-card-podprice"
            v-if="store.selectedPeriod === 'yearly'"
          >
            Billed yearly at $212
          </p>
          <div class="pricing-card-blocks">
            <TickIcon class="icon" :size="25" />
            <span>4,000 Premium AI Messages </span>
          </div>
          <div class="pricing-card-blocks">
            <TickIcon class="icon" :size="25" />
            <span>100 HD Image Generations</span>
          </div>
          <div class="pricing-card-blocks">
            <TickIcon class="icon" :size="25" />
            <span>15 AI Video Creations</span>
          </div>
          <div class="pricing-card-blocks">
            <TickIcon class="icon" :size="25" />
            <span>All Premium AI Models</span>
          </div>
          <div class="pricing-card-blocks">
            <TickIcon class="icon" :size="25" />
            <span>AI Mindmap Generator</span>
          </div>
          <div class="pricing-card-blocks">
            <TickIcon class="icon" :size="25" />
            <span>Writing Library Access</span>
          </div>
          <RouterLink to="/pricing" class="button2">
            <button>Upgrade to Pro</button>
          </RouterLink>
        </div>
        <div class="pricing-card pricing-card3">
          <h3 class="pricing-card-title">Expert</h3>
          <p class="pricing-card-text">Maximum AI power for professionals</p>
          <h4 class="pricing-card-price">$25 /mo</h4>
          <p
            class="pricing-card-podprice"
            v-if="store.selectedPeriod === 'yearly'"
          >
            Billed yearly at $294
          </p>
          <div class="pricing-card-blocks">
            <TickIcon class="icon" :size="25" />
            <span>8,000 Premium AI Messages</span>
          </div>
          <div class="pricing-card-blocks">
            <TickIcon class="icon" :size="25" />
            <span>300 HD Image Generations</span>
          </div>
          <div class="pricing-card-blocks">
            <TickIcon class="icon" :size="25" />
            <span>30 AI Video Creations</span>
          </div>
          <div class="pricing-card-blocks">
            <TickIcon class="icon" :size="25" />
            <span>All Premium AI Models</span>
          </div>
          <div class="pricing-card-blocks">
            <TickIcon class="icon" :size="25" />
            <span>AI Mindmap Generator</span>
          </div>
          <div class="pricing-card-blocks">
            <TickIcon class="icon" :size="25" />
            <span>Writing Library Access</span>
          </div>
          <RouterLink class="button" to="/pricing">
            <button>Upgrade to Expert</button>
          </RouterLink>
        </div>
      </div>
      <div class="features-container">
        <h1 class="features-title">Features</h1>
        <p class="features-text">See exactly what you get with each plan</p>
        <table class="features-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th class="th">Starter</th>
              <th class="th">Pro</th>
              <th class="th">Expert</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Monthly Message Credits</td>
              <td>1,000</td>
              <td>4,000</td>
              <td>8,000</td>
            </tr>
            <tr>
              <td>Monthly Image Generations</td>
              <td>30</td>
              <td>100</td>
              <td>300</td>
            </tr>
            <tr>
              <td>Monthly Video Generations</td>
              <td>5</td>
              <td>15</td>
              <td>30</td>
            </tr>
            <tr>
              <td>GPT-4o</td>
              <td>✔️</td>
              <td>✔️</td>
              <td>✔️</td>
            </tr>
            <tr>
              <td>Claude 3.5 Sonnet</td>
              <td>✔️</td>
              <td>✔️</td>
              <td>✔️</td>
            </tr>
            <tr>
              <td>Gemini Pro</td>
              <td>✔️</td>
              <td>✔️</td>
              <td>✔️</td>
            </tr>
            <tr>
              <td>Perplexity Online</td>
              <td>✔️</td>
              <td>✔️</td>
              <td>✔️</td>
            </tr>
            <tr>
              <td>Writing Library</td>
              <td>✔️</td>
              <td>✔️</td>
              <td>✔️</td>
            </tr>
            <tr>
              <td>AI Mindmaps</td>
              <td>✔️</td>
              <td>✔️</td>
              <td>✔️</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

</template>
