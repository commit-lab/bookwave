"use client";

import { Box, Typography } from "@mui/joy";
import BookContent from "@/features/books/components/book-content";
import { CreateAuthorModal } from "@/features/author/components/create-author-modal";
import CreateBook from "@/features/books/components/create-book";

export default function Books() {
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
