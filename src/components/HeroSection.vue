<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";

const props = defineProps({
  coverDesktop: { type: String, required: true },
  coverMobile: { type: String, required: true },
  subtitle: { type: String, default: "Wedding Ceremony" },
  coupleNames: { type: String, default: "Daniyar & Amanat" },
  city: { type: String, default: "АЛМАТЫ Қ." },
  eventIso: { type: String, required: true },
  musicUrl: { type: String, required: true },
});

const heroStyle = computed(() => ({
  "--cover-desktop": `url("${props.coverDesktop}")`,
  "--cover-mobile": `url("${props.coverMobile}")`,
}));

const prettyDate = computed(() => {
  const d = new Date(props.eventIso);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${day} . ${month} . ${d.getFullYear()}`;
});

/* ---- Audio ---- */
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

audioElement.addEventListener("ended", () => (isPlaying.value = false));

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

onBeforeUnmount(() => audioElement.pause());
</script>

<template>
  <section class="hero" :style="heroStyle">
    <div class="hero__overlay">
      <div class="hero__frame">
        <div class="hero__inner">
          <div class="hero__subtitle">{{ subtitle }}</div>

          <div class="hero__divider">
            <span></span><i></i><span></span>
          </div>

          <h1 class="hero__names">{{ coupleNames }}</h1>

          <div class="hero__meta">
            <span class="hero__city">{{ city }}</span>
            <span class="hero__dot">•</span>
            <span class="hero__date">{{ prettyDate }}</span>
          </div>
        </div>
      </div>

      <button
        class="hero__play"
        type="button"
        @click="toggleMusic"
        :aria-label="isPlaying ? 'Pause music' : 'Play music'"
      >
        <span v-if="!isPlaying" class="hero__playIcon">▶</span>
        <span v-else class="hero__playIcon hero__playIcon--pause">❚❚</span>
        <span class="hero__playText">{{ isPlaying ? "Playing" : "Music" }}</span>
      </button>

      <div class="hero__scroll" aria-hidden="true">
        <span></span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100svh;
  background-image: var(--cover-desktop);
  background-size: cover;
  background-position: center;
  position: relative;
}

@media (max-width: 640px) {
  .hero { background-image: var(--cover-mobile); }
}

.hero__overlay {
  min-height: 100svh;
  position: relative;
  display: grid;
  place-items: center;
  padding: 28px;
  background: linear-gradient(
    180deg,
    rgba(30, 22, 12, 0.28) 0%,
    rgba(30, 22, 12, 0.14) 40%,
    rgba(30, 22, 12, 0.5) 100%
  );
}

/* thin gold frame inset */
.hero__frame {
  position: absolute;
  inset: 22px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  display: grid;
  place-items: center;
  pointer-events: none;
}

.hero__inner {
  text-align: center;
  color: #fff;
  padding: 24px;
  max-width: 760px;
}

.hero__subtitle {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.42em;
  font-weight: 500;
  font-size: clamp(13px, 1.6vw, 17px);
  padding-left: 0.42em;
  opacity: 0.95;
}

.hero__divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 22px auto;
  width: min(240px, 70%);
}
.hero__divider span {
  height: 1px; flex: 1;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
}
.hero__divider i {
  width: 6px; height: 6px; transform: rotate(45deg);
  background: var(--gold-soft); flex: 0 0 auto;
}

.hero__names {
  font-family: var(--font-script);
  font-weight: 400;
  font-size: clamp(52px, 11vw, 118px);
  line-height: 1;
  margin: 0;
  text-shadow: 0 6px 30px rgba(0, 0, 0, 0.35);
}

.hero__meta {
  margin-top: 26px;
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: clamp(12px, 1.5vw, 15px);
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding-left: 0.22em;
}
.hero__dot { opacity: 0.7; font-size: 10px; }

/* Music button */
.hero__play {
  position: absolute;
  right: 40px;
  bottom: 40px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px 12px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.55);
  color: #fff;
  backdrop-filter: blur(6px);
  transition: background 0.25s ease, transform 0.25s ease;
}
.hero__play:hover { background: rgba(255, 255, 255, 0.24); transform: translateY(-2px); }
.hero__playIcon { font-size: 12px; line-height: 1; }
.hero__playIcon--pause { font-size: 10px; letter-spacing: 1px; }
.hero__playText {
  font-family: var(--font-sans);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 11px;
}

/* scroll hint */
.hero__scroll {
  position: absolute;
  left: 50%;
  bottom: 34px;
  transform: translateX(-50%);
  width: 22px; height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  display: grid;
  place-items: start center;
  padding-top: 7px;
}
.hero__scroll span {
  width: 3px; height: 7px; border-radius: 3px;
  background: rgba(255, 255, 255, 0.9);
  animation: scrollDot 1.6s infinite;
}
@keyframes scrollDot {
  0% { opacity: 0; transform: translateY(-3px); }
  40% { opacity: 1; }
  100% { opacity: 0; transform: translateY(10px); }
}

@media (max-width: 640px) {
  .hero__frame { inset: 14px; }
  .hero__overlay { padding: 16px; }
  .hero__play { right: 18px; bottom: 74px; padding: 10px 16px 10px 14px; }
  .hero__playText { display: none; }
  .hero__meta { flex-direction: column; gap: 8px; }
  .hero__dot { display: none; }
}
</style>
