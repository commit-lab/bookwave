import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "firebase/auth";
import { shouldDebugLog } from "@/lib/logging/debug";

export interface AuthStore {
  socialUserIdentity: User | null;
  setSocialUserIdentity: (user: User | null) => void;
  authError: unknown;
  setAuthError: (error: unknown) => void;
  setAll: (params: Pick<AuthStore, "socialUserIdentity" | "authError">) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      socialUserIdentity: null,
      authError: null,
      setSocialUserIdentity: (socialUserIdentity) => {
        set({ socialUserIdentity });
      },
      setAuthError: (authError: unknown) => {
        set({ authError });
      },
      setAll: (params) => {
        set(params);
      },
    }),
    {
      enabled: shouldDebugLog(),
      name: "AuthStore",
    },
  ),
);
