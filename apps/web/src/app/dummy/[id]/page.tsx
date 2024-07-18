"use client";

import { Button } from "@mui/joy";
import { useIsSignedIn } from "@/features/auth/hooks/use-is-signed-in";
import UpdateDummyPageContent from "@/features/dummy/components/update-dummy-page-content";
import { useSignIn } from "@/features/auth/hooks/use-sign-in";

interface SingleDummyPageProps {
  id: string;
}
export default function SingleDummyPage({
  params: { id },
}: {
  params: SingleDummyPageProps;
}) {
  const signIn = useSignIn();
  const isSignedIn = useIsSignedIn();

  return isSignedIn ? (
    <UpdateDummyPageContent dummyId={id} />
  ) : (
    <Button onClick={signIn} type="button">
      Sign In
    </Button>
  );
}
