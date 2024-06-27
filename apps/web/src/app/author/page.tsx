"use client";

import { Button } from "@mui/joy";
import { useIsSignedIn } from "@/features/auth/hooks/use-is-signed-in";
import { useSignIn } from "@/features/auth/hooks/use-sign-in";
import { AuthorPageContent } from "@/features/author/components/author-page-content";

export default function AuthorPage() {
  const signIn = useSignIn();
  const isSignedIn = useIsSignedIn();

  return isSignedIn ? (
    <AuthorPageContent />
  ) : (
    <Button onClick={signIn} type="button">
      Sign In
    </Button>
  );
}
