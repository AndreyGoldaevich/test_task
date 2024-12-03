import { defineStore } from "pinia"
import type { OnboardingModel } from "~/models/onboarding/OnboardingModel"

interface State {
  currentOnboardingId: number | null
}

export const useOnboardingStore = defineStore("onboardingStore", {
  state: () => ({
    currentOnboardingId: null as number | null,
  }),

  actions: {
    async createOnboarding() {
      try {
        const config = useRuntimeConfig()
        const response = await fetchApi<OnboardingModel>(
          "/api/onboarding",
          {
            method: "POST",
            baseURL: config.public.baseURL,
          },
          {}
        )
        this.currentOnboardingId = response.data.id
      } catch (error) {
        console.error("Error creating onboarding:", error)
      }
    },

    async completeOnboarding() {
      if (!this.currentOnboardingId) {
        throw new Error("Current onboarding ID not set")
      }

      try {
        const config = useRuntimeConfig()
        await fetchApi(
          `/api/onboarding/${this.currentOnboardingId}`,
          {
            method: "PATCH",
            baseURL: config.public.baseURL,
          },
          {
            completed_onboarding: true,
          }
        )
        this.currentOnboardingId = null
      } catch (error) {
        console.error("Error completing onboarding:", error)
      }
    },
  },
})

async function fetchApi<T>(
  url: string,
  options: RequestInit,
  body?: Record<string, unknown>
): Promise<{ data: T }> {
  const config = useRuntimeConfig()
  const fullUrl = `${config.public.baseURL}${url}`
  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${fullUrl}: ${response.status}`)
  }

  return response.json()
}
