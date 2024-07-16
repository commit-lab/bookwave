"use client";

import { Box, Stack, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import { useAllBooks } from "@/features/books/queries";
import CreateBook from "@/features/admin/components/create-book";
import BookCard from "@/features/admin/components/book-card";

export default function BookContent() {
  const { data } = useAllBooks();
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.body,
        gap: "20px",
        flex: 1,
      }}
    >
      {data?.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
            }}
          >
            You don&apos;t have any books!
          </Typography>
          <CreateBook formName="CREATE ONE TO GET STARTED" />
        </Box>
      ) : (
        <Stack spacing={2}>
          {data?.map((book) => <BookCard book={book} key={book.id} />)}
        </Stack>
      )}
    </Box>
  );
}
