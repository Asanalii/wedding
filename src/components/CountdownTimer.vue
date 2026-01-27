<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  targetIso: { type: String, required: true },
});

const nowMs = ref(Date.now());
let timerId = null;

onMounted(() => {
  timerId = window.setInterval(() => {
    nowMs.value = Date.now();
  }, 1000);
});

onBeforeUnmount(() => {
  if (timerId) window.clearInterval(timerId);
});

const timeLeft = computed(() => {
  const targetMs = new Date(props.targetIso).getTime();
  const diffMs = Math.max(0, targetMs - nowMs.value);

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
});
</script>

<template>
  <div class="grid">
    <div class="card">
      <div class="value">{{ timeLeft.days }}</div>
      <div class="label">Күн</div>
    </div>
    <div class="card">
      <div class="value">{{ timeLeft.hours }}</div>
      <div class="label">Сағат</div>
    </div>
    <div class="card">
      <div class="value">{{ timeLeft.minutes }}</div>
      <div class="label">Мин</div>
    </div>
    <div class="card">
      <div class="value">{{ timeLeft.seconds }}</div>
      <div class="label">Сек</div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
.card {
  background: rgba(0, 0, 0, 0.06);
  border-radius: var(--radius);
  padding: 14px;
  text-align: center;
}
.value {
  font-size: 28px;
  font-weight: 900;
}
.label {
  font-size: 12px;
  opacity: 0.7;
}
</style>
