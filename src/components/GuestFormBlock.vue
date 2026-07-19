<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import tableBlurImage from "@/assets/images/table_blur.png";
import galleryImage1 from "@/assets/images/table_not_blur.webp";
import galleryImage2 from "@/assets/images/gallery_sample_picture.png";

const props = defineProps({
  eventIso: { type: String, required: true },
  backgroundImage: { type: String, default: tableBlurImage },
  title: { type: String, default: "ҚОНАҚ АНКЕТАСЫ" },
  subtitle: {
    type: String,
    default: "ТОЙҒА ҚАТЫСУЫҢЫЗДЫ РАСТАУЫҢЫЗДЫ СҰРАЙМЫЗ!",
  },
  deadlineText: { type: String, default: "ЖАУАБЫН 20.01 ДЕЙІН КҮТЕМІЗ!" },
  nameLabel: { type: String, default: "Сіздің аты-жөніңіз" },
  partnerLabel: {
    type: String,
    default: "Жұбайыңыздың есімі (егер келетін болса)",
  },
  attendanceLabel: { type: String, default: "Тойға келесіз бе?" },
  optionYes: { type: String, default: "Иә, келемін" },
  optionWithPartner: { type: String, default: "Жұбайыммен келемін" },
  optionNo: { type: String, default: "Келмеймін" },
  buttonText: { type: String, default: "Жіберу" },
  sendingText: { type: String, default: "Жіберілуде…" },
  sentText: { type: String, default: "{{ sentText }}" },
  partnerHint: { type: String, default: "{{ partnerHint }}" },
  noteTitle: { type: String, default: "Өтініш" },
  noteText: {
    type: String,
    default: "Мобилографтарыңызды үйлеріңізге қалдырып кетіңіздер!",
  },
  countdownLabel: { type: String, default: "Тойдың басталуына дейін" },
  countdownUnits: {
    type: Object,
    default: () => ({
      days: "күн",
      hours: "сағат",
      minutes: "минут",
      seconds: "секунд",
    }),
  },
  lang: { type: String, default: "kk" },
  errorText: {
    type: String,
    default: "Қате шықты. Қайталап көріңіз.",
  },
});

const guestFullName = ref("");
const partnerName = ref("");
const attendance = ref("yes");
const isSubmitting = ref(false);
const isSent = ref(false);
const isError = ref(false);

const needsPartner = computed(() => attendance.value === "with_partner");
const partnerError = computed(
  () => needsPartner.value && !partnerName.value.trim(),
);

const nowMs = ref(Date.now());
let timerId = null;

// URL Google Apps Script из .env (VITE_SHEETS_URL)
const SHEETS_URL = import.meta.env.VITE_SHEETS_URL;

// Telegram из .env (бот только отправляет — сервер не нужен)
const TG_TOKEN = import.meta.env.VITE_TG_TOKEN;
const TG_CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;

// Человекочитаемый вариант выбора для таблицы
const attendanceText = () => {
  if (attendance.value === "yes") return props.optionYes;
  if (attendance.value === "with_partner") return props.optionWithPartner;
  return props.optionNo;
};

// Отправка уведомления в Telegram. Ошибки тут не критичны:
// главное — запись в таблицу, поэтому глушим их отдельно.
const sendTelegram = async (data) => {
  if (!TG_TOKEN || !TG_CHAT_ID) return;

  const langFlag = { kk: "🇰🇿", ru: "🇷🇺", en: "🇬🇧" }[data.lang] || "";
  const lines = [
    "🎉 <b>Жаңа жауап / Новый ответ</b>",
    "",
    `👤 <b>Қонақ:</b> ${data.name}`,
    data.partner ? `💑 <b>Жұбайы:</b> ${data.partner}` : "",
    `✅ <b>Жауабы:</b> ${data.attendance}`,
    `${langFlag} <b>Тіл:</b> ${data.lang}`,
  ].filter(Boolean);

  const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: lines.join("\n"),
        parse_mode: "HTML",
      }),
    });
  } catch (err) {
    console.warn("Telegram notify failed (не критично):", err);
  }
};

const submitForm = async () => {
  if (!guestFullName.value.trim()) return;
  if (partnerError.value) return;

  isSubmitting.value = true;
  isSent.value = false;
  isError.value = false;

  const payload = {
    name: guestFullName.value.trim(),
    partner: partnerName.value.trim(),
    attendance: attendanceText(),
    lang: props.lang,
  };

  try {
    if (!SHEETS_URL) throw new Error("SHEETS_URL is not set");

    // no-cors: Apps Script не отдаёт CORS-заголовки, поэтому ответ
    // прочитать нельзя, но запрос доходит и строка записывается.
    // Отправляем и в таблицу, и в Telegram одновременно.
    // Таблица через no-cors (ответ не читаем, но запись идёт),
    // Telegram — отдельно, его ошибки не ломают успех формы.
    await Promise.all([
      fetch(SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      }),
      sendTelegram(payload),
    ]);

    isSent.value = true;
    guestFullName.value = "";
    partnerName.value = "";
    attendance.value = "yes";
  } catch (err) {
    console.error("RSVP submit failed:", err);
    isError.value = true;
  } finally {
    isSubmitting.value = false;
  }
};

const timeLeft = computed(() => {
  const targetMs = new Date(props.eventIso).getTime();
  const diffMs = Math.max(0, targetMs - nowMs.value);
  const totalSeconds = Math.floor(diffMs / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
});

const pad = (n) => String(n).padStart(2, "0");

onMounted(() => {
  timerId = window.setInterval(() => (nowMs.value = Date.now()), 1000);
});
onBeforeUnmount(() => {
  if (timerId) window.clearInterval(timerId);
});

const galleryImages = [galleryImage1, galleryImage2];
const currentGalleryIndex = ref(0);
const currentGalleryImage = computed(
  () => galleryImages[currentGalleryIndex.value],
);
const showPrevImage = () => {
  const p = currentGalleryIndex.value - 1;
  currentGalleryIndex.value = p < 0 ? galleryImages.length - 1 : p;
};
const showNextImage = () => {
  const n = currentGalleryIndex.value + 1;
  currentGalleryIndex.value = n >= galleryImages.length ? 0 : n;
};
</script>

<template>
  <section class="rsvp" :style="{ '--bg': `url('${backgroundImage}')` }">
    <div class="rsvp__overlay">
      <div class="rsvp__container">
        <!-- Countdown -->
        <div class="countdown">
          <div class="countdown__label t-caps">{{ countdownLabel }}</div>
          <div class="countdown__row">
            <div class="countdown__item">
              <div class="countdown__value">{{ pad(timeLeft.days) }}</div>
              <div class="countdown__unit">{{ countdownUnits.days }}</div>
            </div>
            <span class="countdown__sep">:</span>
            <div class="countdown__item">
              <div class="countdown__value">{{ pad(timeLeft.hours) }}</div>
              <div class="countdown__unit">{{ countdownUnits.hours }}</div>
            </div>
            <span class="countdown__sep">:</span>
            <div class="countdown__item">
              <div class="countdown__value">{{ pad(timeLeft.minutes) }}</div>
              <div class="countdown__unit">{{ countdownUnits.minutes }}</div>
            </div>
            <span class="countdown__sep">:</span>
            <div class="countdown__item">
              <div class="countdown__value">{{ pad(timeLeft.seconds) }}</div>
              <div class="countdown__unit">{{ countdownUnits.seconds }}</div>
            </div>
          </div>
        </div>

        <div class="rsvp__grid">
          <!-- Gallery -->
          <div class="gallery">
            <div class="gallery__frame">
              <transition name="fade" mode="out-in">
                <img
                  :key="currentGalleryIndex"
                  class="gallery__image"
                  :src="currentGalleryImage"
                  alt="Тойхана"
                />
              </transition>
            </div>
            <button
              class="gallery__arrow gallery__arrow--left"
              type="button"
              @click="showPrevImage"
              aria-label="Алдыңғы сурет"
            >
              ‹
            </button>
            <button
              class="gallery__arrow gallery__arrow--right"
              type="button"
              @click="showNextImage"
              aria-label="Келесі сурет"
            >
              ›
            </button>
          </div>

          <!-- Form card -->
          <div class="card">
            <h2 class="card__title t-display">{{ title }}</h2>
            <div class="divider"><span class="divider__gem"></span></div>
            <p class="card__subtitle t-serif">{{ subtitle }}</p>
            <div class="card__deadline t-caps">{{ deadlineText }}</div>

            <form class="form" @submit.prevent="submitForm">
              <label class="field">
                <span class="field__label t-caps">{{ nameLabel }}</span>
                <input
                  v-model.trim="guestFullName"
                  class="field__input"
                  type="text"
                  required
                />
              </label>

              <label class="field">
                <span class="field__label t-caps">{{ partnerLabel }}</span>
                <input
                  v-model.trim="partnerName"
                  class="field__input"
                  type="text"
                  :class="{ 'field__input--error': partnerError }"
                />
                <span v-if="partnerError" class="field__hint">
                  {{ partnerHint }}
                </span>
              </label>

              <div class="field">
                <span class="field__label t-caps">{{ attendanceLabel }}</span>
                <div class="radios">
                  <label
                    class="radio"
                    :class="{ 'radio--on': attendance === 'yes' }"
                  >
                    <input type="radio" value="yes" v-model="attendance" />
                    <span class="radio__dot"></span>
                    <span class="radio__text">{{ optionYes }}</span>
                  </label>
                  <label
                    class="radio"
                    :class="{ 'radio--on': attendance === 'with_partner' }"
                  >
                    <input
                      type="radio"
                      value="with_partner"
                      v-model="attendance"
                    />
                    <span class="radio__dot"></span>
                    <span class="radio__text">{{ optionWithPartner }}</span>
                  </label>
                  <label
                    class="radio"
                    :class="{ 'radio--on': attendance === 'no' }"
                  >
                    <input type="radio" value="no" v-model="attendance" />
                    <span class="radio__dot"></span>
                    <span class="radio__text">{{ optionNo }}</span>
                  </label>
                </div>
              </div>

              <button class="submit" type="submit" :disabled="isSubmitting">
                {{ isSubmitting ? sendingText : buttonText }}
              </button>

              <transition name="fade">
                <div v-if="isSent" class="sent">
                  {{ sentText }}
                </div>
              </transition>
              <transition name="fade">
                <div v-if="isError" class="sent sent--error">
                  {{ errorText }}
                </div>
              </transition>
            </form>

            <div class="note">
              <div class="note__title t-script">{{ noteTitle }}</div>
              <div class="note__text t-serif">{{ noteText }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.rsvp {
  background-image: var(--bg);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
@media (max-width: 860px) {
  .rsvp {
    background-attachment: scroll;
  }
}

.rsvp__overlay {
  padding: clamp(56px, 8vw, 110px) 20px;
  background: linear-gradient(
    180deg,
    rgba(40, 32, 20, 0.62),
    rgba(40, 32, 20, 0.72)
  );
}
.rsvp__container {
  max-width: var(--page-max);
  margin: 0 auto;
}

/* Countdown */
.countdown {
  text-align: center;
  margin-bottom: clamp(40px, 6vw, 70px);
  color: #fff;
}
.countdown__label {
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 20px;
}
.countdown__row {
  display: inline-flex;
  align-items: flex-start;
  gap: clamp(10px, 2vw, 26px);
}
.countdown__item {
  min-width: 64px;
}
.countdown__value {
  font-family: var(--font-serif);
  font-weight: 500;
  font-size: clamp(40px, 7vw, 72px);
  line-height: 1;
  color: #fff;
}
.countdown__unit {
  font-family: var(--font-sans);
  text-transform: lowercase;
  letter-spacing: 0.1em;
  font-size: 12px;
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.8);
}
.countdown__sep {
  font-family: var(--font-serif);
  font-size: clamp(32px, 5vw, 56px);
  color: var(--gold-soft);
  line-height: 1;
  padding-top: 4px;
}

/* Grid: gallery + form */
.rsvp__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(28px, 4vw, 48px);
  align-items: center;
}
@media (min-width: 900px) {
  .rsvp__grid {
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
  }
}

/* Gallery */
.gallery {
  position: relative;
  display: grid;
  place-items: center;
}
.gallery__frame {
  width: 100%;
  max-width: 480px;
  aspect-ratio: 4 / 5;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: var(--shadow-card);
}
.gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.gallery__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--ink);
  font-size: 24px;
  display: grid;
  place-items: center;
  box-shadow: var(--shadow-soft);
  transition:
    background 0.2s,
    transform 0.2s;
}
.gallery__arrow:hover {
  background: #fff;
}
.gallery__arrow--left {
  left: max(8px, calc(50% - 240px - 22px));
}
.gallery__arrow--right {
  right: max(8px, calc(50% - 240px - 22px));
}
@media (max-width: 560px) {
  .gallery__arrow--left {
    left: 8px;
  }
  .gallery__arrow--right {
    right: 8px;
  }
}

/* Form card */
.card {
  background: var(--bg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: clamp(28px, 4vw, 48px);
  max-width: 520px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.card__title {
  font-size: clamp(24px, 3.2vw, 34px);
  margin-bottom: 16px;
}
.divider {
  margin-bottom: 16px;
}
.card__subtitle {
  font-size: clamp(15px, 1.6vw, 18px);
  color: var(--ink-soft);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.card__deadline {
  color: var(--gold-deep);
  margin: 12px 0 28px;
}

.form {
  display: grid;
  gap: 22px;
  text-align: left;
}
.field {
  display: grid;
  gap: 8px;
}
.field__label {
  font-size: 12px;
}
.field__input {
  height: 46px;
  padding: 0 4px;
  border: 0;
  border-bottom: 1px solid var(--line);
  background: transparent;
  color: var(--ink);
  font-family: var(--font-serif);
  font-size: 18px;
  transition: border-color 0.2s;
}
.field__input:focus {
  border-color: var(--gold);
}
.field__input--error {
  border-color: #c0603f;
}
.field__hint {
  font-family: var(--font-sans);
  font-size: 11px;
  color: #c0603f;
}

.radios {
  display: grid;
  gap: 12px;
  margin-top: 4px;
}
.radio {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid var(--bg-deep);
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s;
}
.radio--on {
  border-color: var(--gold);
  background: rgba(184, 148, 77, 0.08);
}
.radio input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.radio__dot {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 1px solid var(--line);
  flex: 0 0 auto;
  position: relative;
  transition: border-color 0.2s;
}
.radio--on .radio__dot {
  border-color: var(--gold);
}
.radio--on .radio__dot::after {
  content: "";
  position: absolute;
  inset: 4px;
  border-radius: 999px;
  background: var(--gold);
}
.radio__text {
  font-family: var(--font-serif);
  font-size: 17px;
  color: var(--ink);
}

.submit {
  height: 52px;
  border-radius: 999px;
  background: var(--gold);
  color: #fff;
  font-family: var(--font-sans);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 13px;
  transition:
    background 0.25s,
    transform 0.15s;
}
.submit:hover:not(:disabled) {
  background: var(--gold-deep);
  transform: translateY(-1px);
}
.submit:disabled {
  opacity: 0.6;
}

.sent {
  text-align: center;
  font-family: var(--font-serif);
  font-size: 17px;
  color: var(--gold-deep);
  padding: 6px;
}
.sent--error {
  color: #c0603f;
}

.note {
  margin-top: 30px;
  padding-top: 24px;
  border-top: 1px solid var(--bg-deep);
}
.note__title {
  font-size: clamp(28px, 4vw, 40px);
  margin-bottom: 8px;
}
.note__text {
  font-size: clamp(15px, 1.6vw, 18px);
  color: var(--ink-soft);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
