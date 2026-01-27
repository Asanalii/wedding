<script setup>
import { ref } from "vue";

const props = defineProps({
  deadlineText: { type: String, default: "" },
  successText: { type: String, default: "Готово!" },
});

const guestFullName = ref("");
const partnerName = ref("");
const attendance = ref("yes");

const isSubmitting = ref(false);
const successMessage = ref("");

const submit = async () => {
  isSubmitting.value = true;
  successMessage.value = "";

  // TODO: подключим отправку (Telegram / Google Sheets / backend)
  await new Promise((resolve) => setTimeout(resolve, 600));

  isSubmitting.value = false;
  successMessage.value = props.successText;

  guestFullName.value = "";
  partnerName.value = "";
  attendance.value = "yes";
};
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <label class="label">
      СІЗДІҢ АТЫ-ЖӨНІҢІЗ *
      <input v-model.trim="guestFullName" class="input" required />
    </label>

    <label class="label">
      ЖҰБАЙЫҢЫЗДЫҢ ЕСІМІ
      <input v-model.trim="partnerName" class="input" />
    </label>

    <div class="label">
      ТОЙҒА КЕЛЕСІЗ БЕ?
      <div class="radio">
        <label
          ><input type="radio" value="yes" v-model="attendance" /> Ия</label
        >
        <label
          ><input type="radio" value="with_partner" v-model="attendance" />
          Жұбайыммен келемін</label
        >
        <label
          ><input type="radio" value="no" v-model="attendance" />
          Келмеймін</label
        >
      </div>
    </div>

    <button class="button" type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? "ЖІБЕРІЛУДЕ..." : "ОТПРАВИТЬ!" }}
    </button>

    <div class="hint">{{ deadlineText }}</div>
    <div v-if="successMessage" class="success">{{ successMessage }}</div>
  </form>
</template>

<style scoped>
.form {
  display: grid;
  gap: 14px;
  max-width: 520px;
}
.label {
  display: grid;
  gap: 8px;
  font-weight: 700;
}
.input {
  padding: 12px 14px;
  border-radius: var(--radius);
  border: 1px solid rgba(0, 0, 0, 0.15);
}
.radio {
  display: grid;
  gap: 8px;
  font-weight: 500;
}
.button {
  padding: 12px 14px;
  border-radius: var(--radius);
  border: 0;
  font-weight: 900;
  cursor: pointer;
}
.hint {
  font-size: 13px;
  opacity: 0.7;
}
.success {
  padding: 12px 14px;
  border-radius: var(--radius);
  background: rgba(0, 128, 0, 0.08);
}
</style>
