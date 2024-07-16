"use client";

import { Box, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import AllChapters from "@/features/chapters/components/all-chapters";
import CreateChapter from "@/features/chapters/components/create-chapter";
import { useAllChapters } from "@/features/chapters/queries";

export default function ChapterList({ bookId }: { bookId: string }) {
  const { data } = useAllChapters(bookId);
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
      {data?.chapterTitles.length === 0 ? (
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
            You don&apos;t have any chapters!
          </Typography>
          <CreateChapter bookId={bookId} />
        </Box>
      ) : (
        <AllChapters bookId={bookId} />
      )}
    </Box>
  );
}
