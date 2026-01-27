<script setup>
import finalBackgroundImage from "@/assets/images/final_block.webp";

const props = defineProps({
  backgroundImage: { type: String, default: finalBackgroundImage },
  topText: { type: String, default: "ҚҰРМЕТПЕН, ТОЙ ИЕЛЕРІ" },
  namesText: { type: String, default: "Асанәлі - Асан" },
});
</script>

<template>
  <section class="final" :style="{ '--final-bg': `url('${backgroundImage}')` }">
    <div class="final__overlay">
      <div class="final__content">
        <div class="final__top invite-title">{{ topText }}</div>
        <div class="final__names kz-text">{{ namesText }}</div>
        <div class="final__line"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.final {
  min-height: 28vh;
  max-height: 320px;
  background-image: var(--final-bg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.final__overlay {
  min-height: 28vh;
  max-height: 320px;
  display: grid;
  place-items: center;
  padding: 46px 16px;
  background: rgba(0, 0, 0, 0.35);
}

.final__content {
  width: 100%;
  max-width: 700px;
  text-align: center;
  color: rgba(255, 255, 255, 0.95);
}

.final__top {
  font-size: 22px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 22px;
}

.final__names {
  margin-top: 80px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(32px, 6vw, 52px);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.final__line {
  width: 220px;
  height: 1px;
  background: rgba(255, 255, 255, 0.65);
  margin: 0 auto;
}
</style>
