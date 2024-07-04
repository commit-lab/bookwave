"use client";

import { Box, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import CreateBook from "@/components/create-book";
import { useAllBooks } from "@/features/books/queries";

export default function BookContent() {
  const theme = useTheme();
  const { data } = useAllBooks();
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
      {data?.length === 0 && (
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
      )}
    </Box>
  );
}
