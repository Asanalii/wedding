<script setup>
import { invitationConfig as config } from "@/config/invitation.config.js";
import HeroSection from "./components/HeroSection.vue";
import InvitationDetails from "./components/InvitationDetails.vue";
import DressCodeBlock from "./components/DressCodeBlock.vue";
import GuestFormBlock from "./components/GuestFormBlock.vue";
import FinalThanksBlock from "./components/FinalThanksBlock.vue";
</script>

<template>
  <div class="page">
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
      :two-gis-link="config.location.mapLink"
    />

    <DressCodeBlock />

    <GuestFormBlock
      :event-iso="config.eventDateTime"
      :deadline-text="config.rsvp.deadline"
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
