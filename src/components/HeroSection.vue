<script setup>
import { computed } from "vue";

const props = defineProps({
  coverDesktop: { type: String, required: true },
  coverMobile: { type: String, required: true },
  subtitle: { type: String, default: "" },
  coupleNames: { type: String, default: "" },
  eventIso: { type: String, required: true },
});

const heroStyle = computed(() => ({
  "--cover-desktop": `url("${props.coverDesktop}")`,
  "--cover-mobile": `url("${props.coverMobile}")`,
}));

const prettyDate = computed(() => {
  const dateObj = new Date(props.eventIso);
  return dateObj.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});
</script>

<template>
  <section class="hero" :style="heroStyle">
    <div class="overlay">
      <div class="subtitle">{{ subtitle }}</div>
      <div class="names">{{ coupleNames }}</div>
      <div class="date">{{ prettyDate }}</div>
      <div class="divider" />
      <div class="hint">Scroll ↓</div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  background-image: var(--cover-desktop);
  background-size: cover;
  background-position: center;
  position: relative;
}
@media (max-width: 480px) {
  .hero {
    background-image: var(--cover-mobile);
  }
}
.overlay {
  min-height: 100vh;
  display: grid;
  place-content: center;
  gap: 14px;
  text-align: center;
  padding: 40px 16px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4));
  color: #fff;
}
.subtitle {
  letter-spacing: 3px;
  text-transform: uppercase;
  font-size: 13px;
  opacity: 0.9;
}
.names {
  font-size: clamp(34px, 6vw, 58px);
  font-weight: 800;
  line-height: 1.05;
}
.date {
  font-size: 16px;
  opacity: 0.9;
}
.divider {
  width: 120px;
  height: 2px;
  background: rgba(255, 255, 255, 0.6);
  margin: 10px auto 0;
  border-radius: 2px;
}
.hint {
  margin-top: 14px;
  font-size: 12px;
  opacity: 0.8;
}
</style>
