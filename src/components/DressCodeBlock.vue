<script setup>
import dresscodeMenImage from "@/assets/images/dresscode_men.webp";
import dresscodeWomenImage from "@/assets/images/dresscode_women.webp";

const props = defineProps({
  title: { type: String, default: "ДРЕСС - КОД" },

  menTitle: { type: String, default: "Ерлерге:" },
  menText: { type: String, default: "Классикалық\nкостюм" },

  womenTitle: { type: String, default: "Әйелдерге:" },
  womenText: { type: String, default: "Коктейльді,\nжәне кешкі\nкөйлектер" },

  menImage: { type: String, default: dresscodeMenImage },
  womenImage: { type: String, default: dresscodeWomenImage },
});
</script>

<template>
  <section class="dress">
    <div class="dress__container">
      <h3 class="dress__title invite-title">{{ title }}</h3>

      <div class="dress__grid">
        <div class="dress__item">
          <img class="dress__icon" :src="menImage" alt="" />
          <div class="dress__text kz-text">
            <div class="dress__label">{{ menTitle }}</div>
            <div class="dress__desc">
              <span v-for="(line, index) in menText.split('\n')" :key="index">
                {{ line }}<br v-if="index < menText.split('\n').length - 1" />
              </span>
            </div>
          </div>
        </div>

        <div class="dress__item">
          <img class="dress__icon" :src="womenImage" alt="" />
          <div class="dress__text">
            <div class="dress__label">{{ womenTitle }}</div>
            <div class="dress__desc">
              <span v-for="(line, index) in womenText.split('\n')" :key="index">
                {{ line }}<br v-if="index < womenText.split('\n').length - 1" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dress {
  background: #f6f0e6;
  padding: 10px 16px 40px;
}

.dress__container {
  max-width: 520px;
  margin: 0 auto;
  text-align: center;
}

.dress__title {
  margin: 0 0 22px;
  font-size: 28px;
  letter-spacing: 1px;
  font-weight: 400;
}

.dress__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 26px;
  align-items: start;
}

.dress__item {
  display: grid;
  justify-items: center;
  gap: 14px;
}

.dress__icon {
  width: 92px;
  height: auto;
  display: block;
  user-select: none;
  pointer-events: none;
}

.dress__label {
  font-weight: 700;
  font-size: 14px;
}

.dress__desc {
  font-size: 14px;
  line-height: 1.45;
  opacity: 0.9;
}

/* на очень маленьких экранах можно оставить 2 колонки, но если хочешь в 1 колонку: */
@media (max-width: 360px) {
  .dress__grid {
    gap: 18px;
  }
}
</style>
