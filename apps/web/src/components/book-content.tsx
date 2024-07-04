"use client";

import { Box, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import { useAllBooks } from "@/features/books/queries";
import CreateBook from "@/components/create-book";
import AllBooks from "@/components/all-books";

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
          <CreateBook />
        </Box>
      ) : (
        <AllBooks />
      )}
    </Box>
  );
}
