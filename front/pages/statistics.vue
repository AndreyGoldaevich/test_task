<template>
  <div v-if="status !== 'idle'" class="wrapper">
    <h1>Analytics</h1>
    <h2>
      Number of people completed onboarding: {{ completedOnboardingsCount }}
    </h2>
    <h2>
      Percent people who completed onboarding: {{ percentageCompleters }}%
    </h2>
  </div>
  <div v-else class="loading-wrapper">Loading...</div>
</template>

<script setup lang="ts">
import type { StatisticsModel } from "~/models/onboarding/StatisticsModel"

const config = useRuntimeConfig()

useHead({
  title: "Statistics",
})

const { data, status } = await useFetch<StatisticsModel>(
  "/api/onboarding/statistics",
  {
    baseURL: config.public.baseURL,
    server: false,
  }
)

const safeData = computed(() => {
  return data.value ?? {}
})

const completedOnboardingsCount = computed(() => {
  return getSafeData(safeData.value.completedOnboardingsCount, 0)
})

const allOnboardingsCount = computed(() => {
  return getSafeData(safeData.value.allOnboardingsCount, 0)
})

const percentageCompleters = ref(0)

watch(
  [completedOnboardingsCount, allOnboardingsCount],
  ([newCompleted, newAll]) => {
    percentageCompleters.value = calculatePercentage(newCompleted, newAll)
  },
  { immediate: true }
)

const calculatePercentage = (completed: number, total: number) => {
  if (total === 0) return 0
  return Math.floor((completed / total) * 100)
}

const getSafeData = (value, defaultValue = 0) => {
  return value === undefined || value === null ? defaultValue : value
}

const onboardingCompleted = () => {
  safeData.value.completedOnboardingsCount++
  percentageCompleters.value = calculatePercentage(
    completedOnboardingsCount.value,
    allOnboardingsCount.value
  )
}

const onboardingStarted = () => {
  safeData.value.allOnboardingsCount++
  percentageCompleters.value = calculatePercentage(
    completedOnboardingsCount.value,
    allOnboardingsCount.value
  )
}

const { $socket } = useNuxtApp()

onMounted(() => {
  $socket.on("onboardingCompleted", onboardingCompleted)
  $socket.on("onboardingStarted", onboardingStarted)
})

onBeforeUnmount(() => {
  $socket.off("onboardingCompleted", onboardingCompleted)
  $socket.off("onboardingStarted", onboardingStarted)
})
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}

.loading-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #777;
}
</style>
