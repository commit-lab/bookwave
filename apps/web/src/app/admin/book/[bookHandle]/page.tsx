"use client";

import { Box, Typography } from "@mui/joy";
import StateSwitch from "@/features/admin/components/state-switch";
import ChapterList from "@/features/chapters/components/chapter-list";
import { useAllChapters } from "@/features/chapters/queries";

interface ChaptersPageProps {
  bookHandle: string;
}

export default function ChaptersPage({
  params: { bookHandle },
}: {
  params: ChaptersPageProps;
}) {
  const { data } = useAllChapters(bookHandle);

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
        <Typography level="h2">Chapters</Typography>
        <StateSwitch />
      </Box>

      <ChapterList
        bookHandle={bookHandle}
        bookId={data ? data.id : ""}
        chapterTitles={data?.chapterTitles}
      />
    </Box>
  );
}
