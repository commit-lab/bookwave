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
  const { setSocialUserIdentity, setAuthError, setAll, socialUserIdentity } =
    useAuthStore();
  const { auth } = getFirebaseAuth();

  useEffect(() => {
    if (auth) {
      const unsubscribeAuthState = onAuthStateChanged(auth, (nextUser) => {
        if (nextUser) {
          setSocialUserIdentity(nextUser);
        } else {
          setSocialUserIdentity(null);
        }
      });
      return () => {
        unsubscribeAuthState();
      };
    }
  }, [auth, setSocialUserIdentity]);

  const handleSignIn = useCallback(async () => {
    try {
      if (!auth) {
        throw new Error("Auth is null");
      }
      await signInWithPopup(auth, provider);
    } catch (unknownError: unknown) {
      setAuthError(unknownError);
      // eslint-disable-next-line no-console -- Want this to be visible for now.
      console.error("Error signing in.", unknownError);
      throw unknownError;
    }
  }, [auth, setAuthError]);

  const handleSignOut = useCallback(async () => {
    try {
      setAll({
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
