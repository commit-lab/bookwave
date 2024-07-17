"use client";

import { Box, CircularProgress, Typography } from "@mui/joy";
import { redirect } from "next/navigation";
import BookContent from "@/features/admin/components/book-content";
import { useIsSignedIn } from "@/features/auth/hooks/use-is-signed-in";
import { useAuthorInfo } from "@/features/author/queries";
import { CreateAuthorModal } from "@/features/author/components/create-author-modal";
import CreateBook from "@/features/admin/components/create-book";

export default function Books() {
  const isSignedIn = useIsSignedIn();
  const { data, isLoading } = useAuthorInfo();
  if (!isSignedIn) {
    redirect("/home");
  }

  const authorExists = data?.author;

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
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
      {!authorExists && <CreateAuthorModal />}
    </Box>
  );
}
