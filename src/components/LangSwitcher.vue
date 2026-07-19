<script setup>
defineProps({
  languages: { type: Array, required: true },
  current: { type: String, required: true },
});

// Базовый префикс сайта (напр. "/wedding") — берём из <base> или BASE_URL Vite
const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const href = (path) => `${base}${path}`;
</script>

<template>
  <nav class="lang" aria-label="Language">
    <template v-for="(l, i) in languages" :key="l.code">
      <a
        class="lang__item"
        :class="{ 'lang__item--on': l.code === current }"
        :href="href(l.path)"
      >
        {{ l.label }}
      </a>
      <span v-if="i < languages.length - 1" class="lang__sep">·</span>
    </template>
  </nav>
</template>

<style scoped>
.lang {
  position: fixed;
  top: 22px;
  left: 22px;
  z-index: 100;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
}
.lang__item {
  font-family: var(--font-sans);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
  transition: color 0.2s;
}
.lang__item--on {
  color: #fff;
  font-weight: 500;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
}
.lang__item:hover { color: #fff; }
.lang__sep { color: rgba(255, 255, 255, 0.5); font-size: 11px; }

@media (max-width: 640px) {
  .lang { top: 16px; left: 16px; padding: 8px 14px; }
}
</style>
