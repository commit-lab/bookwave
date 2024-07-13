"use client";

import { Box, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import { useAllBooks } from "@/features/books/queries";
import AllBooks from "@/features/admin/components/all-books";
import CreateBook from "@/features/admin/components/create-book";

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
        <AllBooks />
      )}
    </Box>
  );
}
