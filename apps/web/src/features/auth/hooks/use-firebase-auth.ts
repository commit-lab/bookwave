"use client";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useCallback, useEffect } from "react";
import { getFirebaseAuth } from "@/features/auth/firebase";
import { useAuthStore } from "@/features/auth/stores/auth-store";

const provider = new GoogleAuthProvider();

interface FirebaseAuth {
  handleSignIn: () => Promise<void>;
  handleSignOut: () => Promise<void>;
  isSignedIn: boolean;
}

export const useFirebaseAuth = (): FirebaseAuth => {
  const {
    setAccessToken,
    setSocialUserIdentity,
    accessToken,
    setAuthError,
    setAll,
    socialUserIdentity,
  } = useAuthStore();
  const { auth } = getFirebaseAuth();

  useEffect(() => {
    if (auth) {
      const unsubscribeAuthState = onAuthStateChanged(
        auth,
        async (nextUser) => {
          if (nextUser) {
            if (!accessToken) {
              const token = await nextUser.getIdToken();
              setAccessToken(token);
            }
            setSocialUserIdentity(nextUser);
          } else {
            setSocialUserIdentity(null);
          }
        },
      );
      return () => {
        unsubscribeAuthState();
      };
    }
  }, [auth, accessToken, setAccessToken, setSocialUserIdentity]);

  const handleSignIn = useCallback(async () => {
    try {
      if (!auth) {
        throw new Error("Auth is null");
      }
      const result = await signInWithPopup(auth, provider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) {
        throw new Error("Credential is null");
      }
      setAccessToken(credential.accessToken ?? null);
      // The signed-in user info.
      setSocialUserIdentity(result.user);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    } catch (unknownError: unknown) {
      setAuthError(unknownError);
      // eslint-disable-next-line no-console -- Want this to be visible for now.
      console.error("Error signing in.", unknownError);
      throw unknownError;
    }
  }, [auth, setAccessToken, setSocialUserIdentity, setAuthError]);

  const handleSignOut = useCallback(async () => {
    try {
      setAll({
        accessToken: null,
        socialUserIdentity: null,
        authError: null,
      });
      if (!auth) {
        throw new Error("Auth is null");
      }
      await signOut(auth);
    } catch (unknownError: unknown) {
      // eslint-disable-next-line no-console -- Want this to be visible for now.
      console.error("Error signing in.", unknownError);
      throw unknownError;
    }
  }, [auth, setAll]);

  return {
    handleSignIn,
    handleSignOut,
    isSignedIn: Boolean(socialUserIdentity),
  };
};
