"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Card, CardContent, Typography } from "@mui/joy";
import Image from "next/image";
import { useIsSignedIn } from "@/features/auth/hooks/use-is-signed-in";
import { useSignIn } from "@/features/auth/hooks/use-sign-in";

export default function SignIn() {
  const router = useRouter();
  const signIn = useSignIn();
  const isSignedIn = useIsSignedIn();

  if (isSignedIn) {
    router.push("/create-account");
  }

  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        background: "#f5faff",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          maxWidth: 600,
          p: 6,
          border: "2px solid black",
          borderRadius: "5%",
          mx: { xs: "1rem" },
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography
              level="h1"
              component="h1"
              sx={{ fontFamily: "Gloria Hallelujah", mb: 3 }}
            >
              Welcome to Bookwave!
            </Typography>

            <Typography
              component="h2"
              level="h3"
              sx={{ fontFamily: "Gloria Hallelujah", mb: 5 }}
            >
              Sign in to get started.
            </Typography>
            <Image
              src="/images/app-icon.png"
              alt="app icon"
              width={100}
              height={100}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={signIn}
              variant="solid"
              color="primary"
              sx={{
                width: { xs: "100% ", sm: "50%", md: "50%", lg: "50%" },
                fontFamily: "Gloria Hallelujah",
                p: 3,
              }}
            >
              Sign in with Google
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
