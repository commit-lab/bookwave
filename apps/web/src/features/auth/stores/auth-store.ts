import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "firebase/auth";
import { shouldDebugLog } from "@/lib/logging/debug";

export interface AuthStore {
  socialUserIdentity: User | null;
  setSocialUserIdentity: (user: User | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  authError: unknown;
  setAuthError: (error: unknown) => void;
  setAll: (
    params: Pick<AuthStore, "socialUserIdentity" | "accessToken" | "authError">
  ) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      accessToken: null,
      socialUserIdentity: null,
      authError: null,
      setSocialUserIdentity: (socialUserIdentity) => {
        set({ socialUserIdentity });
      },
      setAccessToken: (accessToken) => {
        set({ accessToken });
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
    }
  )
);
