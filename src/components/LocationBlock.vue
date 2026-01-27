<script setup>
defineProps({
  placeName: { type: String, default: "" },
  address: { type: String, default: "" },
  mapEmbedUrl: { type: String, default: "" },
});
</script>

<template>
  <div class="location">
    <div class="text">
      <div class="place">{{ placeName }}</div>
      <div class="address">{{ address }}</div>
    </div>

    <iframe
      v-if="mapEmbedUrl && mapEmbedUrl.includes('google.com/maps/embed')"
      class="map"
      :src="mapEmbedUrl"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    />
    <div v-else class="mapPlaceholder">
      Вставь Google Maps Embed ссылку в config
    </div>
  </div>
</template>

<style scoped>
.location {
  display: grid;
  gap: 16px;
}
.text {
  display: grid;
  gap: 6px;
}
.place {
  font-size: 18px;
  font-weight: 800;
}
.address {
  opacity: 0.8;
}
.map {
  width: 100%;
  height: 360px;
  border: 0;
  border-radius: var(--radius);
}
.mapPlaceholder {
  height: 360px;
  border-radius: var(--radius);
  border: 1px dashed rgba(0, 0, 0, 0.25);
  display: grid;
  place-items: center;
  opacity: 0.7;
}
</style>
