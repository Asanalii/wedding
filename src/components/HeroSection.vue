<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";

const props = defineProps({
  coverDesktop: { type: String, required: true },
  coverMobile: { type: String, required: true },

  subtitle: { type: String, default: "WEDDING CEREMONY" },
  coupleNames: { type: String, default: "DANIYAR & AMANAT" },

  city: { type: String, default: "АЛМАТЫ Қ." },
  eventIso: { type: String, required: true },

  musicUrl: { type: String, required: true },
});

const heroStyle = computed(() => ({
  "--cover-desktop": `url("${props.coverDesktop}")`,
  "--cover-mobile": `url("${props.coverMobile}")`,
}));

const prettyDateOnly = computed(() => {
  const dateObj = new Date(props.eventIso);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = String(dateObj.getFullYear());
  return `${day}.${month}.${year}`;
});

// ===== Audio (как в твоем MusicPlayer) =====
const isPlaying = ref(false);
const audioElement = new Audio(props.musicUrl);
audioElement.volume = 0.4;

watch(
  () => props.musicUrl,
  (newUrl) => {
    audioElement.pause();
    audioElement.src = newUrl;
    isPlaying.value = false;
  },
);

audioElement.addEventListener("ended", () => {
  isPlaying.value = false;
});

const toggleMusic = async () => {
  if (!isPlaying.value) {
    try {
      await audioElement.play();
      isPlaying.value = true;
    } catch (error) {
      console.error("Play blocked:", error);
    }
    return;
  }

  audioElement.pause();
  isPlaying.value = false;
};

onBeforeUnmount(() => {
  audioElement.pause();
});
</script>

<template>
  <section class="hero" :style="heroStyle">
    <div class="hero__overlay">
      <div class="hero__topLeft">
        <div class="hero__subtitle">{{ subtitle }}</div>
        <div class="hero__names">{{ coupleNames }}</div>
      </div>

      <div class="hero__bottomLeft">
        <div class="hero__city">{{ city }}</div>
        <div class="hero__date">{{ prettyDateOnly }}</div>
      </div>

      <button
        class="hero__playButton"
        type="button"
        @click="toggleMusic"
        :aria-label="isPlaying ? 'Stop music' : 'Play music'"
      >
        {{ isPlaying ? "STOP" : "PLAY" }}
      </button>
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

/* мягкое затемнение как на сайте */
.hero__overlay {
  min-height: 100vh;
  position: relative;
  padding: 42px 18px;
  color: rgba(255, 255, 255, 0.95);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.28) 0%,
    rgba(0, 0, 0, 0.18) 45%,
    rgba(0, 0, 0, 0.42) 100%
  );
}

/* ВЕРХ СЛЕВА */
.hero__topLeft {
  position: absolute;
  top: 56px;
  left: 22px;
  right: 22px;
  max-width: 420px;
}

.hero__subtitle {
  font-family: var(--font-title);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.1;
}

.hero__names {
  font-family: var(--font-title);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
  font-size: 22px;
  margin-top: 10px;
  line-height: 1.1;
}

/* НИЗ СЛЕВА */
.hero__bottomLeft {
  position: absolute;
  left: 22px;
  bottom: 38px;
}

.hero__city {
  font-family: var(--font-title);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 6px;
}

.hero__date {
  font-family: var(--font-title);
  letter-spacing: 0.04em;
  font-weight: 600;
  font-size: 18px;
  opacity: 0.95;
}

/* PLAY кнопка справа снизу */
.hero__playButton {
  position: absolute;
  right: 22px;
  bottom: 34px;

  width: 84px;
  height: 84px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  color: #111;

  display: grid;
  place-items: center;

  font-family: var(--font-body);
  font-weight: 700;
  letter-spacing: 0.04em;

  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45);
}

/* чтобы на очень узких экранах всё не уехало */
@media (max-width: 360px) {
  .hero__subtitle {
    font-size: 20px;
  }
  .hero__names {
    font-size: 18px;
  }
  .hero__playButton {
    width: 76px;
    height: 76px;
  }
}
</style>
