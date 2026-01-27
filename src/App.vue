<script setup>
import { invitationConfig as config } from "@/config/invitation.config.js";
import MusicPlayer from "./components/MusicPlayer.vue";
import HeroSection from "./components/HeroSection.vue";
import SectionBlock from "./components/SectionBlock.vue";
import CountdownTimer from "./components/CountdownTimer.vue";
import RsvpForm from "./components/RsvpForm.vue";
import LocationBlock from "./components/LocationBlock.vue";
import InvitationDetails from "./components/InvitationDetails.vue";

// import MusicPlayer from "@/components/MusicPlayer.vue";
// import HeroSection from "@/components/HeroSection.vue";
// import SectionBlock from "@/components/SectionBlock.vue";
// import CountdownTimer from "@/components/CountdownTimer.vue";
// import LocationBlock from "@/components/LocationBlock.vue";
// import RsvpForm from "@/components/RsvpForm.vue";
</script>

<template>
  <div class="page">
    <MusicPlayer :music-url="config.musicUrl" />

    <HeroSection
      :cover-desktop="config.cover.desktop"
      :cover-mobile="config.cover.mobile"
      :subtitle="config.subtitle"
      :couple-names="config.coupleNames"
      :event-iso="config.eventDateTime"
    />

    <InvitationDetails
      :event-iso="config.eventDateTime"
      title="ҚҰРМЕТТІ ҚОНАҚТАР!"
      invitation-text="Сіздерді біздің өміріміздегі ең маңызды сәтті бірге сезінуге, әрі келуіңізді құрметті қонағы болуға шын ниетпен шақырамыз!"
      location-title="МЕКЕНЖАЙЫ"
      location-name='"Resident Ballroom" мейрамханасы'
      location-address="Желтоқсан көшесі 23, Алматы қ."
    />

    <SectionBlock title="Таймер">
      <CountdownTimer :target-iso="config.eventDateTime" />
    </SectionBlock>

    <SectionBlock title="Локация">
      <LocationBlock
        :place-name="config.location.placeName"
        :address="config.location.address"
        :map-embed-url="config.location.mapEmbedUrl"
      />
    </SectionBlock>

    <SectionBlock :title="config.rsvp.title">
      <RsvpForm
        :deadline-text="config.rsvp.deadline"
        :success-text="config.rsvp.success"
      />
    </SectionBlock>

    <footer class="footer">Made with ❤️</footer>
  </div>
</template>

<style>
:root {
  --page-max: 980px;
  --radius: 18px;
}

.page {
  min-height: 100vh;
  color: #111;
  background: #fff;
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
}

.footer {
  padding: 40px 16px;
  text-align: center;
  opacity: 0.7;
}
</style>
