<template>
  <div class="wrapper">
    <Button label="Get Started" class="get-started-button" @click="onGetStarted" />
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/Button.vue";
import { useOnboardingStore } from "~/stores/OnboardingStore";

useHead({
  title: "Main Page"
});

const { createOnboarding } = useOnboardingStore();
const router = useRouter();
const onGetStarted = async () => {
  await createOnboarding();
  await router.push("/onboarding/1");
};


</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>