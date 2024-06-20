import { ApiClient } from "@bookwave/api-client";
import { useAuthStore } from "@/features/auth/stores/auth-store";

const LOCAL_API = "http://localhost:4000";
const REMOTE_API = "https://api.bookwave.com";

export const apiClient = new ApiClient({
  BASE: process.env.NODE_ENV === "development" ? LOCAL_API : REMOTE_API,
  TOKEN: async () => {
    return Promise.resolve(
      useAuthStore.getState().socialUserIdentity?.getIdToken() ?? "",
    );
  },
});
