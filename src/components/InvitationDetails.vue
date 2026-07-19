<script setup>
import { computed } from "vue";

import whiteFlowersImage from "@/assets/images/white_flowers.webp";
import twoGisImage from "@/assets/images/2gis.webp";

const props = defineProps({
  eventIso: { type: String, required: true },
  title: { type: String, default: "ҚҰРМЕТТІ ҚОНАҚТАР!" },
  invitationText: {
    type: String,
    default:
      "Сіздерді біздің өміріміздегі ең маңызды сәтті бірге сезінуге, әрі келуіңізді құрметті қонағы болуға шын ниетпен шақырамыз!",
  },
  locationTitle: { type: String, default: "МЕКЕНЖАЙЫ" },
  locationName: { type: String, default: '"Resident Ballroom" мейрамханасы' },
  locationAddress: { type: String, default: "Желтоқсан көшесі 23, Алматы қ." },
  flowerImage: { type: String, default: whiteFlowersImage },
  twoGisImage: { type: String, default: twoGisImage },
  twoGisLink: { type: String, default: "https://2gis.kz/almaty" },
  mapText: { type: String, default: "Картадан қарау" },
  months: {
    type: Array,
    default: () => [
      "қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым",
      "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан",
    ],
  },
  weekdays: {
    type: Array,
    default: () => ["ДҮЙ", "СЕЙ", "СӘР", "БЕЙ", "ЖҰМ", "СЕН", "ЖЕК"],
  },
});

const kzMonths = computed(() => props.months);

const eventDate = computed(() => new Date(props.eventIso));
const dayNumber = computed(() => eventDate.value.getDate());
const dayNumberValue = computed(() => dayNumber.value);
const monthIndex = computed(() => eventDate.value.getMonth());
const year = computed(() => String(eventDate.value.getFullYear()));
const paddedDay = computed(() => String(dayNumber.value).padStart(2, "0"));
const paddedMonth = computed(() => String(monthIndex.value + 1).padStart(2, "0"));

const time = computed(() => {
  const h = String(eventDate.value.getHours()).padStart(2, "0");
  const m = String(eventDate.value.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
});

function getMondayBasedWeekdayIndex(dateObject) {
  const jsDay = dateObject.getDay();
  return (jsDay + 6) % 7;
}

function getDaysInMonth(y, m) {
  return new Date(y, m + 1, 0).getDate();
}

const calendarCells = computed(() => {
  const y = eventDate.value.getFullYear();
  const firstDay = new Date(y, monthIndex.value, 1);
  const startOffset = getMondayBasedWeekdayIndex(firstDay);
  const totalDays = getDaysInMonth(y, monthIndex.value);
  const cells = [];
  for (let i = 0; i < startOffset; i += 1) cells.push(null);
  for (let d = 1; d <= totalDays; d += 1) cells.push(d);
  while (cells.length < 42) cells.push(null);
  return cells;
});
</script>

<template>
  <section class="details">
    <div class="details__container">
      <header class="details__head">
        <div class="divider"><span class="divider__gem"></span></div>
        <h2 class="details__title t-display">{{ title }}</h2>
        <p class="details__text t-serif">{{ invitationText }}</p>
      </header>

      <div class="details__grid">
        <!-- LEFT: date + address + flowers -->
        <div class="details__left">
          <div class="details__dateRow">
            <span>{{ paddedDay }}</span>
            <i></i>
            <span>{{ paddedMonth }}</span>
            <i></i>
            <span>{{ year }}</span>
          </div>
          <div class="details__time">{{ time }}</div>

          <img class="details__flower" :src="flowerImage" alt="" />

          <div class="address">
            <h3 class="address__title t-display">{{ locationTitle }}</h3>
            <div class="address__text t-serif">
              <div>{{ locationName }}</div>
              <div>{{ locationAddress }}</div>
            </div>
            <a
              class="address__map"
              :href="twoGisLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="address__mapPin">◍</span>
              <span>{{ mapText }}</span>
            </a>
          </div>
        </div>

        <!-- RIGHT: calendar card -->
        <div class="details__right">
          <div class="calendar">
            <div class="calendar__label t-caps">
              {{ paddedDay }} {{ kzMonths[monthIndex] }} {{ year }}
            </div>
            <div class="calendar__weekdays">
              <div v-for="wd in weekdays" :key="wd" class="calendar__weekday">
                {{ wd }}
              </div>
            </div>
            <div class="calendar__days">
              <div
                v-for="(dayItem, dayIndex) in calendarCells"
                :key="dayIndex"
                class="calendar__day"
                :class="{
                  'calendar__day--empty': dayItem === null,
                  'calendar__day--selected': dayItem === dayNumberValue,
                }"
              >
                <span v-if="dayItem !== null" class="calendar__dayNumber">
                  {{ dayItem }}
                </span>
                <svg
                  v-if="dayItem === dayNumberValue"
                  class="calendar__heart"
                  viewBox="0 0 64 58"
                  aria-hidden="true"
                >
                  <path
                    d="M32 54 C 18 44, 6 35, 6 22 C 6 12, 14 6, 22 6 C 27 6, 30 9, 32 12 C 34 9, 37 6, 42 6 C 50 6, 58 12, 58 22 C 58 35, 46 44, 32 54 Z"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.details {
  background:
    radial-gradient(120% 90% at 50% 0%, var(--bg-warm) 0%, var(--bg) 70%);
  padding: clamp(56px, 8vw, 100px) 20px;
}

.details__container {
  max-width: var(--page-max);
  margin: 0 auto;
}

.details__head {
  text-align: center;
  max-width: 640px;
  margin: 0 auto clamp(40px, 6vw, 72px);
}
.divider { margin-bottom: 22px; }

.details__title {
  font-size: clamp(24px, 3.4vw, 38px);
  margin-bottom: 20px;
}
.details__text {
  font-size: clamp(17px, 1.6vw, 21px);
  color: var(--ink-soft);
}

/* two-column on desktop */
.details__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: center;
}
@media (min-width: 860px) {
  .details__grid { grid-template-columns: 1fr 1fr; align-items: start; }
}

.details__left { text-align: center; }

.details__dateRow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  font-family: var(--font-serif);
  font-weight: 500;
  font-size: clamp(44px, 7vw, 68px);
  color: var(--ink);
  line-height: 1;
}
.details__dateRow i {
  width: 1px; height: 42px;
  background: var(--line);
}
.details__time {
  font-family: var(--font-serif);
  font-size: clamp(20px, 2.4vw, 26px);
  color: var(--gold-deep);
  letter-spacing: 0.1em;
  margin-top: 12px;
}

.details__flower {
  width: min(320px, 70%);
  margin: 8px auto 12px;
  opacity: 0.95;
  mix-blend-mode: multiply;
}

.address__title {
  font-size: clamp(20px, 2.6vw, 28px);
  margin-bottom: 12px;
}
.address__text {
  font-size: clamp(16px, 1.6vw, 19px);
  color: var(--ink);
}
.address__map {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: 20px;
  padding: 11px 22px;
  border: 1px solid var(--gold);
  border-radius: 999px;
  color: var(--gold-deep);
  font-family: var(--font-sans);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 12px;
  transition: background 0.25s, color 0.25s;
}
.address__map:hover { background: var(--gold); color: #fff; }
.address__mapPin { font-size: 14px; }

/* Calendar card */
.calendar {
  background: #fff;
  border: 1px solid var(--gold-soft);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  padding: clamp(22px, 3vw, 34px);
  max-width: 420px;
  margin: 0 auto;
}
.calendar__label {
  text-align: center;
  color: var(--gold-deep);
  margin-bottom: 18px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--bg-deep);
}
.calendar__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 6px;
}
.calendar__weekday {
  text-align: center;
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--ink-soft);
  padding: 6px 0;
}
.calendar__days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.calendar__day {
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  position: relative;
  font-family: var(--font-serif);
  font-size: clamp(15px, 1.8vw, 18px);
  color: var(--ink);
}
.calendar__day--empty { opacity: 0; }
.calendar__day--selected { color: var(--gold-deep); font-weight: 600; }
.calendar__dayNumber { position: relative; z-index: 2; }
.calendar__heart {
  position: absolute;
  width: 78%; height: 78%;
  left: 50%; top: 52%;
  transform: translate(-50%, -50%);
  color: var(--gold);
  z-index: 1;
  animation: heartPulse 1.8s ease-in-out infinite;
}
@keyframes heartPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.9; }
  50% { transform: translate(-50%, -50%) scale(1.08); opacity: 1; }
}
</style>
