<script setup>
defineProps({
  title: { type: String, required: true },
});
</script>

<template>
  <section class="section">
    <h2 class="title">{{ title }}</h2>
    <div class="content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.section {
  max-width: var(--page-max);
  margin: 0 auto;
  padding: 44px 16px;
}
.title {
  font-size: 22px;
  margin: 0 0 16px;
}
.content {
  display: grid;
  gap: 16px;
}
</style>
