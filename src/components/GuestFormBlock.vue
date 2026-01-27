<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import tableBlurImage from "@/assets/images/table_blur.png";

import galleryImage1 from "@/assets/images/table_not_blur.webp";
import galleryImage2 from "@/assets/images/gallery_sample_picture.png";
// import galleryImage3 from "@/assets/images/gallery_3.webp";

const props = defineProps({
  eventIso: { type: String, required: true },
  backgroundImage: { type: String, default: tableBlurImage },

  title: { type: String, default: "ҚОНАҚ АНКЕТАСЫ" },
  subtitle: {
    type: String,
    default: "ТОЙҒА ҚАТЫСУЫҢЫЗДЫ\nРАСТАУЫҢЫЗДЫ СҰРАЙМЫЗ!",
  },
  deadlineText: { type: String, default: "ЖАУАБЫН 10.08 ДЕЙІН КҮТЕМІЗ!" },

  nameLabel: { type: String, default: "СІЗДІҢ АТЫ-ЖӨНІҢІЗ" },
  partnerLabel: {
    type: String,
    default: "ЖҰБАЙЫҢЫЗДЫҢ ЕСІМІ (ЕГЕР ТОЙҒА\nКЕЛЕТІН БОЛСА)",
  },
  attendanceLabel: { type: String, default: "ТОЙҒА КЕЛЕСІЗ БЕ?" },

  optionYes: { type: String, default: "ИЯ" },
  optionWithPartner: { type: String, default: "ЖҰБАЙЫММЕН КЕЛЕМІН" },
  optionNo: { type: String, default: "КЕЛМЕЙМІН" },

  buttonText: { type: String, default: "ОТПРАВИТЬ!" },

  noteTitle: { type: String, default: "Өтініш!" },
  noteText: {
    type: String,
    default: "МОБИЛОГРАФТАРЫҢЫЗДЫ\nҮЙЛЕРІҢІЗГЕ ҚАЛДЫРЫП\nКЕТІҢІЗДЕР!",
  },
});

const guestFullName = ref("");
const partnerName = ref("");
const attendance = ref("yes");
const isSubmitting = ref(false);
const isSent = ref(false);

const nowMs = ref(Date.now());
let timerId = null;

const submitForm = async () => {
  if (!guestFullName.value.trim()) return;

  isSubmitting.value = true;
  isSent.value = false;

  // TODO: позже подключим реальную отправку (Telegram/Sheets/backend)
  await new Promise((resolve) => setTimeout(resolve, 700));

  isSubmitting.value = false;
  isSent.value = true;

  guestFullName.value = "";
  partnerName.value = "";
  attendance.value = "yes";
};

const timeLeft = computed(() => {
  const targetMs = new Date(props.eventIso).getTime();
  const diffMs = Math.max(0, targetMs - nowMs.value);

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
});

onMounted(() => {
  timerId = window.setInterval(() => {
    nowMs.value = Date.now();
  }, 1000);
});

onBeforeUnmount(() => {
  if (timerId) window.clearInterval(timerId);
});

const galleryImages = [
  galleryImage1,
  galleryImage2,

  // , galleryImage3
];
const currentGalleryIndex = ref(0);

const currentGalleryImage = computed(
  () => galleryImages[currentGalleryIndex.value],
);

const showPrevImage = () => {
  const prevIndex = currentGalleryIndex.value - 1;
  currentGalleryIndex.value =
    prevIndex < 0 ? galleryImages.length - 1 : prevIndex;
};

const showNextImage = () => {
  const nextIndex = currentGalleryIndex.value + 1;
  currentGalleryIndex.value = nextIndex >= galleryImages.length ? 0 : nextIndex;
};
</script>

<template>
  <section class="guestForm" :style="{ '--bg': `url('${backgroundImage}')` }">
    <div class="guestForm__overlay">
      <div class="guestForm__container">
        <h2 class="guestForm__title">{{ title }}</h2>

        <p class="guestForm__subtitle">
          <span v-for="(line, index) in subtitle.split('\n')" :key="index">
            {{ line }}<br v-if="index < subtitle.split('\n').length - 1" />
          </span>
        </p>

        <div class="guestForm__deadline">{{ deadlineText }}</div>

        <form class="guestForm__form" @submit.prevent="submitForm">
          <label class="guestForm__label">
            {{ nameLabel }}
            <input
              v-model.trim="guestFullName"
              class="guestForm__input"
              type="text"
              required
            />
          </label>

          <label class="guestForm__label">
            <span
              v-for="(line, index) in partnerLabel.split('\n')"
              :key="index"
            >
              {{ line
              }}<br v-if="index < partnerLabel.split('\n').length - 1" />
            </span>
            <input
              v-model.trim="partnerName"
              class="guestForm__input"
              type="text"
            />
          </label>

          <div class="guestForm__label">
            {{ attendanceLabel }}

            <div class="guestForm__radioList">
              <label class="guestForm__radioItem">
                <input
                  class="guestForm__radioInput"
                  type="radio"
                  value="yes"
                  v-model="attendance"
                />
                <span class="guestForm__radioText">{{ optionYes }}</span>
              </label>

              <label class="guestForm__radioItem">
                <input
                  class="guestForm__radioInput"
                  type="radio"
                  value="with_partner"
                  v-model="attendance"
                />
                <span class="guestForm__radioText">{{
                  optionWithPartner
                }}</span>
              </label>

              <label class="guestForm__radioItem">
                <input
                  class="guestForm__radioInput"
                  type="radio"
                  value="no"
                  v-model="attendance"
                />
                <span class="guestForm__radioText">{{ optionNo }}</span>
              </label>
            </div>
          </div>

          <button
            class="guestForm__button"
            type="submit"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? "..." : buttonText }}
          </button>

          <div v-if="isSent" class="guestForm__sent">Жіберілді ✅</div>
        </form>

        <div class="guestForm__note">
          <div class="guestForm__noteTitle">{{ noteTitle }}</div>
          <div class="guestForm__noteText">
            <span v-for="(line, index) in noteText.split('\n')" :key="index">
              {{ line }}<br v-if="index < noteText.split('\n').length - 1" />
            </span>
          </div>
        </div>

        <div class="guestForm__countdownTitle">ТОЙДЫҢ БАСТАЛУЫНА ДЕЙІН:</div>

        <div class="guestForm__timer">
          <div class="guestForm__timerItem">
            <div class="guestForm__timerValue">{{ timeLeft.days }}</div>
            <div class="guestForm__timerLabel">күн</div>
          </div>

          <div class="guestForm__timerItem">
            <div class="guestForm__timerValue">{{ timeLeft.hours }}</div>
            <div class="guestForm__timerLabel">сағат</div>
          </div>

          <div class="guestForm__timerItem">
            <div class="guestForm__timerValue">{{ timeLeft.minutes }}</div>
            <div class="guestForm__timerLabel">минут</div>
          </div>

          <div class="guestForm__timerItem">
            <div class="guestForm__timerValue">{{ timeLeft.seconds }}</div>
            <div class="guestForm__timerLabel">секунд</div>
          </div>
        </div>

        <div class="guestForm__gallery">
          <button
            class="guestForm__galleryArrow guestForm__galleryArrow--left"
            type="button"
            @click="showPrevImage"
            aria-label="Previous photo"
          >
            ‹
          </button>

          <div class="guestForm__galleryFrame">
            <transition name="fade" mode="out-in">
              <img
                :key="currentGalleryIndex"
                class="guestForm__galleryImage"
                :src="currentGalleryImage"
                alt=""
              />
            </transition>
          </div>

          <button
            class="guestForm__galleryArrow guestForm__galleryArrow--right"
            type="button"
            @click="showNextImage"
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.guestForm {
  min-height: 100vh;
  background-image: var(--bg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.guestForm__overlay {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 48px 16px;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(2px);
}

.guestForm__container {
  width: 100%;
  max-width: 420px;
  text-align: center;
  color: rgba(255, 255, 255, 0.95);
}

.guestForm__title {
  margin: 0 0 14px;
  font-size: 34px;
  letter-spacing: 1px;
  font-family: Georgia, "Times New Roman", serif;
}

.guestForm__subtitle {
  margin: 0 0 14px;
  font-size: 14px;
  line-height: 1.5;
  text-transform: uppercase;
  opacity: 0.95;
}

.guestForm__deadline {
  margin-bottom: 26px;
  font-size: 14px;
  text-transform: uppercase;
  opacity: 0.9;
}

.guestForm__form {
  display: grid;
  gap: 16px;
  margin: 0 auto 28px;
}

.guestForm__label {
  display: grid;
  gap: 10px;
  text-align: left;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  opacity: 0.95;
}

.guestForm__input {
  height: 42px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.75);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  outline: none;
}

.guestForm__input:focus {
  border-color: rgba(255, 255, 255, 0.95);
  background: rgba(255, 255, 255, 0.12);
}

.guestForm__radioList {
  display: grid;
  gap: 10px;
  margin-top: 4px;
}

.guestForm__radioItem {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.guestForm__radioInput {
  width: 18px;
  height: 18px;
  accent-color: white;
  cursor: pointer;
}

.guestForm__radioText {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.guestForm__button {
  height: 44px;
  border: 0;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
  color: #111;
  font-weight: 800;
  letter-spacing: 0.5px;
  cursor: pointer;
  margin-top: 6px;
}

.guestForm__button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.guestForm__sent {
  text-align: center;
  font-size: 13px;
  opacity: 0.95;
}

.guestForm__note {
  margin-top: 10px;
}

.guestForm__noteTitle {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 44px;
  margin-bottom: 6px;
}

.guestForm__noteText {
  font-size: 13px;
  line-height: 1.55;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  opacity: 0.95;
}

.guestForm__countdownTitle {
  margin-top: 18px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  font-size: 12px;
  opacity: 0.95;
}

.guestForm__timer {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  justify-items: center;
  margin-top: 14px;
}

.guestForm__timerItem {
  text-align: center;
}

.guestForm__timerValue {
  font-size: 34px;
  font-weight: 500;
  line-height: 1;
  font-family: Georgia, "Times New Roman", serif;
}

.guestForm__timerLabel {
  margin-top: 8px;
  font-size: 12px;
  opacity: 0.85;
  text-transform: lowercase;
}

/* Галерея */
.guestForm__gallery {
  margin-top: 18px;
  position: relative;
  display: grid;
  place-items: center;
}

.guestForm__galleryFrame {
  width: min(320px, 86vw);
  height: 360px;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
}

.guestForm__galleryImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* стрелки */
.guestForm__galleryArrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 0;
  background: rgba(255, 255, 255, 0.88);
  color: #111;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  display: grid;
  place-items: center;
  user-select: none;
}

.guestForm__galleryArrow--left {
  left: calc(50% - min(320px, 86vw) / 2 + 10px);
}

.guestForm__galleryArrow--right {
  right: calc(50% - min(320px, 86vw) / 2 + 10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 260ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
