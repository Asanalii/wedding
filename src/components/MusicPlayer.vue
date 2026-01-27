<script setup>
import { onBeforeUnmount, ref, watch } from "vue";

const props = defineProps({
  musicUrl: { type: String, required: true },
});

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

const toggle = async () => {
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
  <div class="music">
    <!-- <button class="btn" type="button" @click="toggle">
      {{ isPlaying ? "STOP" : "PLAY" }}
    </button> -->
  </div>
</template>

<style scoped>
.music {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 50;
}
.btn {
  border: 0;
  padding: 10px 14px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 800;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.18);
}
</style>
