"use client";

import { Box, Stack, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import CreateChapter from "@/features/chapters/components/create-chapter";
import ChapterCard from "@/features/chapters/components/chapter-card";

interface ChapterListProps {
  bookHandle: string;
  bookId: string;
  chapterTitles: string[] | undefined;
}
export default function ChapterList({
  bookHandle,
  bookId,
  chapterTitles,
}: ChapterListProps) {
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
      {chapterTitles?.length === 0 ? (
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
        <Stack spacing={2}>
          {chapterTitles?.length ? (
            chapterTitles.map((chapter, index) => (
              <ChapterCard
                bookHandle={bookHandle}
                chapterTitle={chapter}
                chapterNumber={index + 1}
                key={chapter}
              />
            ))
          ) : (
            <div>You don&apos;t have any chapters!</div>
          )}
        </Stack>
      )}
    </Box>
  );
}
