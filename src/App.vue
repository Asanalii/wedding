<script setup>
import { computed } from "vue";
import {
  getConfig,
  detectLang,
  languages,
} from "@/config/invitation.config.js";
import HeroSection from "./components/HeroSection.vue";
import InvitationDetails from "./components/InvitationDetails.vue";
import DressCodeBlock from "./components/DressCodeBlock.vue";
import GuestFormBlock from "./components/GuestFormBlock.vue";
import FinalThanksBlock from "./components/FinalThanksBlock.vue";
import LangSwitcher from "./components/LangSwitcher.vue";

const lang = detectLang();
const config = computed(() => getConfig(lang));
</script>

<template>
  <div class="page">
    <LangSwitcher :languages="languages" :current="lang" />

    <HeroSection
      :cover-desktop="config.cover.desktop"
      :cover-mobile="config.cover.mobile"
      :event-iso="config.eventDateTime"
      :subtitle="config.subtitle"
      :couple-names="config.coupleNames"
      :city="config.city"
      :music-url="config.musicUrl"
    />

    <InvitationDetails
      :event-iso="config.eventDateTime"
      :title="config.details.title"
      :invitation-text="config.details.text"
      :location-title="config.details.locationTitle"
      :location-name="config.location.placeName"
      :location-address="config.location.address"
      :map-text="config.location.mapText"
      :two-gis-link="config.location.mapLink"
      :months="config.months"
      :weekdays="config.weekdays"
    />

    <DressCodeBlock
      :title="config.dress.title"
      :subtitle="config.dress.subtitle"
      :men-title="config.dress.menTitle"
      :men-text="config.dress.menText"
      :women-title="config.dress.womenTitle"
      :women-text="config.dress.womenText"
      :palette="config.palette"
    />

    <GuestFormBlock
      :event-iso="config.eventDateTime"
      :title="config.rsvp.title"
      :subtitle="config.rsvp.subtitle"
      :deadline-text="config.rsvp.deadline"
      :name-label="config.rsvp.nameLabel"
      :partner-label="config.rsvp.partnerLabel"
      :partner-hint="config.rsvp.partnerHint"
      :attendance-label="config.rsvp.attendanceLabel"
      :option-yes="config.rsvp.optionYes"
      :option-with-partner="config.rsvp.optionWithPartner"
      :option-no="config.rsvp.optionNo"
      :button-text="config.rsvp.button"
      :sending-text="config.rsvp.sending"
      :sent-text="config.rsvp.sent"
      :note-title="config.rsvp.noteTitle"
      :note-text="config.rsvp.noteText"
      :countdown-label="config.countdown.label"
      :countdown-units="config.countdown.units"
      :error-text="config.rsvp.error"
      :lang="config.lang"
    />

    <FinalThanksBlock
      :top-text="config.final.topText"
      :names-text="config.final.namesText"
    />
  </div>
</template>

<style>
.page {
  min-height: 100vh;
  color: var(--ink);
  background: var(--bg);
}
</style>
