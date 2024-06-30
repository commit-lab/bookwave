"use client";

import { Box, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import { data } from "@/constants/temp-data";
import CreateBook from "@/components/create-book";
import ChapterCard from "@/components/chapter-card";

export default function BookContent() {
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
      {data.length === 0 && (
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
      {data.map((book) => (
        <ChapterCard key={book.id} book={book} />
      ))}
    </Box>
  );
}
