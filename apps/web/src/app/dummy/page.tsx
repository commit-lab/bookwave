"use client";

import { Button } from "@mui/joy";
import { useIsSignedIn } from "@/features/auth/hooks/use-is-signed-in";
import { useSignIn } from "@/features/auth/hooks/use-sign-in";
import { DummyPageContent } from "@/components/dummy-page-content";

export default function DummyPage() {
  const signIn = useSignIn();
  const isSignedIn = useIsSignedIn();

  return isSignedIn ? (
    <DummyPageContent />
  ) : (
    <Button onClick={signIn} type="button">
      Sign In
    </Button>
  );
}
