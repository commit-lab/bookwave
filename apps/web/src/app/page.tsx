"use client";

import { useSignIn } from "@/features/auth/hooks/use-sign-in";
import { useSignOut } from "@/features/auth/hooks/use-sign-out";
import { useIsSignedIn } from "@/features/auth/hooks/use-is-signed-in";

export default function Page() {
  const signIn = useSignIn();
  const signOut = useSignOut();
  const isSignedIn = useIsSignedIn();

  return (
    <div>
      {isSignedIn ? (
        <button onClick={signOut} type="button">
          Sign Out
        </button>
      ) : (
        <button onClick={signIn} type="button">
          Sign In
        </button>
      )}
    </div>
  );
}
