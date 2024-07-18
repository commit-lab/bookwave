"use client";

import { Box, CircularProgress, Typography } from "@mui/joy";
import { redirect } from "next/navigation";
import BookContent from "@/features/admin/components/book-content";
import { useIsSignedIn } from "@/features/auth/hooks/use-is-signed-in";
import { CreateAuthorModal } from "@/features/author/components/create-author-modal";
import CreateBook from "@/features/admin/components/create-book";
import { useAuthStore } from "@/features/auth/stores/auth-store";

export default function Books() {
  const hasHydrated = useAuthStore((state) => state._hasHydrated);
  const isSignedIn = useIsSignedIn();

  if (!hasHydrated) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isSignedIn) {
    redirect("/home");
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CreateAuthorModal />
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
