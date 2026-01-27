<script setup>
import { computed } from "vue";

import whiteFlowersImage from "@/assets/images/white_flowers.webp";

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
});

const weekdays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

const eventDate = computed(() => new Date(props.eventIso));

const dayNumber = computed(() => eventDate.value.getDate());
const dayNumberValue = computed(() => dayNumber.value);
const monthIndex = computed(() => eventDate.value.getMonth()); // 0..11
const year = computed(() => String(eventDate.value.getFullYear()));

const paddedDay = computed(() => String(dayNumber.value).padStart(2, "0"));
const paddedMonth = computed(() =>
  String(monthIndex.value + 1).padStart(2, "0"),
);

const time = computed(() => {
  const hours = String(eventDate.value.getHours()).padStart(2, "0");
  const minutes = String(eventDate.value.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
});

function getMondayBasedWeekdayIndex(dateObject) {
  // JS: 0=Sunday ... 6=Saturday
  // Нужно: 0=Monday ... 6=Sunday
  const jsDay = dateObject.getDay();
  return (jsDay + 6) % 7;
}

function getDaysInMonth(yearNumber, monthIndexNumber) {
  return new Date(yearNumber, monthIndexNumber + 1, 0).getDate();
}

const calendarCells = computed(() => {
  const yearNumber = eventDate.value.getFullYear();
  const firstDayOfMonth = new Date(yearNumber, monthIndex.value, 1);

  const startOffset = getMondayBasedWeekdayIndex(firstDayOfMonth);
  const totalDays = getDaysInMonth(yearNumber, monthIndex.value);

  const cells = [];

  // пустые ячейки до 1-го числа
  for (let emptyIndex = 0; emptyIndex < startOffset; emptyIndex += 1) {
    cells.push(null);
  }

  // числа месяца
  for (let currentDay = 1; currentDay <= totalDays; currentDay += 1) {
    cells.push(currentDay);
  }

  // добиваем до ровной сетки (6 недель * 7 = 42) чтобы выглядело стабильно
  while (cells.length < 42) {
    cells.push(null);
  }

  return cells;
});
</script>

<template>
  <section class="details">
    <div class="details__container">
      <!-- Заголовок -->
      <div class="details__titleWrap">
        <div class="details__line"></div>
        <h2 class="details__title">{{ title }}</h2>
      </div>

      <!-- Текст приглашения -->
      <p class="details__text">
        {{ invitationText }}
      </p>

      <!-- Дата -->
      <div class="details__dateRow">
        <span class="details__datePart">{{ paddedDay }}</span>
        <span class="details__dateSep">|</span>
        <span class="details__datePart">{{ paddedMonth }}</span>
        <span class="details__dateSep">|</span>
        <span class="details__datePart">{{ year }}</span>
      </div>

      <!-- Время -->
      <div class="details__time">{{ time }}</div>

      <!-- Календарь -->
      <div class="calendar">
        <div class="calendar__topLine"></div>

        <div class="calendar__grid">
          <div class="calendar__weekdays">
            <div
              v-for="weekday in weekdays"
              :key="weekday"
              class="calendar__weekday"
            >
              {{ weekday }}
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

              <!-- Сердечко-рамка (как на скрине) -->
              <svg
                v-if="dayItem === dayNumberValue"
                class="calendar__heartFrame"
                viewBox="0 0 64 58"
                aria-hidden="true"
              >
                <path
                  d="M32 54
           C 18 44, 6 35, 6 22
           C 6 12, 14 6, 22 6
           C 27 6, 30 9, 32 12
           C 34 9, 37 6, 42 6
           C 50 6, 58 12, 58 22
           C 58 35, 46 44, 32 54 Z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="calendar__bottomLine"></div>
      </div>

      <!-- Адрес -->
      <div class="address">
        <h3 class="address__title">{{ locationTitle }}</h3>
        <div class="address__text">
          <div>{{ locationName }}</div>
          <div>{{ locationAddress }}</div>
        </div>

        <img class="address__flower" :src="flowerImage" alt="" />
        <!-- <div class="address__flower" aria-hidden="true"></div> -->
      </div>
    </div>
  </section>
</template>

<style scoped>
/* фон как на скрине */
.details {
  background: #f6f0e6;
  padding: 44px 16px 16px;
}

.details__container {
  max-width: 520px;
  margin: 0 auto;
  text-align: center;
}

/* Заголовок */
.details__titleWrap {
  display: grid;
  gap: 10px;
  justify-items: center;
  margin-bottom: 18px;
}

.details__line {
  width: 140px;
  height: 1px;
  background: rgba(0, 0, 0, 0.5);
}

.details__title {
  margin: 0;
  font-size: 28px;
  letter-spacing: 1px;
  font-family: Georgia, "Times New Roman", serif;
}

/* Текст приглашения */
.details__text {
  margin: 0 auto 24px;
  max-width: 420px;
  line-height: 1.5;
  font-size: 14px;
  opacity: 0.85;
}

/* Дата */
.details__dateRow {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 10px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 42px;
  letter-spacing: 1px;
  margin: 0 0 10px;
}

.details__datePart {
  min-width: 64px;
}

.details__dateSep {
  font-size: 34px;
  opacity: 0.8;
}

/* Время */
.details__time {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 20px;
  margin-bottom: 18px;
}

/* Календарь */
.calendar {
  margin: 0 auto 34px;
  max-width: 380px;
}

.calendar__topLine,
.calendar__bottomLine {
  height: 1px;
  background: rgba(0, 0, 0, 0.45);
  margin: 14px 0;
}

.calendar__grid {
  display: grid;
  gap: 10px;
}

.calendar__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  font-size: 12px;
  opacity: 0.8;
}

.calendar__weekday {
  text-align: center;
}

.calendar__days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  position: relative;
}

.calendar__day {
  height: 34px;
  display: grid;
  place-items: center;
  position: relative;
  font-size: 14px;
}

.calendar__day--empty {
  opacity: 0;
  pointer-events: none;
}

.calendar__dayNumber {
  position: relative;
  z-index: 2;
}

/* Адрес */
.address__title {
  margin: 0 0 10px;
  font-size: 28px;
  letter-spacing: 1px;
  font-family: Georgia, "Times New Roman", serif;
}

.address__text {
  font-size: 14px;
  opacity: 0.85;
  line-height: 1.5;
}

.address__flower {
  width: min(240px, 62vw); /* было 320px/80vw */
  height: auto;
  margin: 16px auto 0;
  display: block;
  opacity: 0.95;
  user-select: none;
  pointer-events: none;
}

.calendar__day {
  height: 34px;
  display: grid;
  place-items: center;
  position: relative;
  font-size: 14px;
}

.calendar__dayNumber {
  position: relative;
  z-index: 2; /* цифра поверх рамки */
}

/* рамка-сердце вокруг числа */
.calendar__heartFrame {
  position: absolute;
  width: 34px;
  height: 30px;
  left: 50%;
  bottom: 1px;
  transform: translateX(-50%);
  color: rgba(0, 0, 0, 0.85);
  z-index: 1;
  pointer-events: none;
  animation: heartPulse 1.6s ease-in-out infinite;
  transform-origin: center;
}

/* пульсация */
@keyframes heartPulse {
  0% {
    transform: translateX(-50%) scale(1);
  }
  50% {
    transform: translateX(-50%) scale(1.18);
  }
  100% {
    transform: translateX(-50%) scale(1);
  }
}
</style>
