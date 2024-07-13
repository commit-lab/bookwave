"use client";

import { Box, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";
import { useIsSignedIn } from "@/features/auth/hooks/use-is-signed-in";
import BookContent from "@/features/admin/components/book-content";
import CreateBook from "@/features/admin/components/create-book";

export default function Books() {
  const router = useRouter();
  const isSignedIn = useIsSignedIn();

  if (!isSignedIn) {
    router.push("/home");
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mx: "4rem",
          my: "2rem",
          flex: 1,
        }}
      >
        <Typography level="h2">Your Books</Typography>
        <CreateBook formName="+" />
      </Box>

      <BookContent />
    </Box>
  );
}
