"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Card, CardContent, Typography } from "@mui/joy";
import { useIsSignedIn } from "@/features/auth/hooks/use-is-signed-in";
import { useSignIn } from "@/features/auth/hooks/use-sign-in";
// import { DummyPageContent } from "@/features/dummy/components/dummy-page-content";

export default function SignIn() {
  const router = useRouter();
  const signIn = useSignIn();
  const isSignedIn = useIsSignedIn();

  if (isSignedIn) {
    router.push("/admin/books");
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f0f0f0",
      }}
    >
      <Card variant="outlined" sx={{ maxWidth: 600 }}>
        <CardContent>
          <Box sx={{ textAlign: "center", marginBottom: 2 }}>
            <Typography level="h1" component="h1">
              Welcome to Bookwave!
            </Typography>
            <Typography level="h2">Sign in to get started.</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={signIn}
              variant="solid"
              color="primary"
              sx={{ width: "50%" }}
            >
              Sign in with Google
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
