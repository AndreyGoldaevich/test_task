<template>
  <div class="onboarding">
    <h2 class="onboarding__title">{{ currentOnboardingItem.title }}</h2>
    <div class="onboarding__video">
      <video loop autoplay muted :src="currentOnboardingItem.video" />
    </div>
    <Button label="Next" :to="currentOnboardingItem.nextPage" @click="onNext" />
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/Button.vue";
import { useOnboardingStore } from "~/stores/OnboardingStore";

type OnboardingItemType = {
  video: string,
  title: string,
  nextPage: string
}

type OnboardingDataType = {
  [key: string]: OnboardingItemType
}

const onboarding: OnboardingDataType = {
  "1": {
    video: "https://cdn.getglam.app/content/paywalls/240515_web2web_video1_v04.mp4",
    title: "Welcome to Glam!",
    nextPage: "/onboarding/2"
  },
  "2": {
    video: "https://cdn.getglam.app/content/paywalls/240515_web2web_video2_v01.mp4",
    title: "Match your Aesthetic",
    nextPage: "/onboarding/3"
  },
  "3": {
    video: "https://cdn.getglam.app/content/paywalls/240515_web2web_video3_v01.mp4",
    title: "Explore 100+ Styles",
    nextPage: "/statistics"
  }
};

definePageMeta({
  validate: async (route) => {
    const id = parseInt(route.params.id as string, 10);
    return id > 0 && id <= 3;
  }
});

const route = useRoute();
useHead({
  title: () => {
    return `Onboarding ${route.params.id}`;
  }
});

const currentOnboardingItem = onboarding[route.params.id as string];

const router = useRouter();
const { currentOnboardingId, completeOnboarding } = useOnboardingStore();

onMounted(() => {
  if (!currentOnboardingId) {
    router.push("/");
  }
});

const onNext = () => {
  if (route.params.id === "3") {
    completeOnboarding();
  }
};

</script>

<style scoped lang="scss">
.onboarding {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 100%;

  &__video {
    flex-grow: 1;
    width: 100%;
    position: relative;

    video {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: auto;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>