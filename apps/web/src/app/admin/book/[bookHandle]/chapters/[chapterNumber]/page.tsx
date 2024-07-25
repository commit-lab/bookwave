"use client";

import { Box, CircularProgress, CssBaseline } from "@mui/joy";
import React, { useRef } from "react";
import { EditChapterForm } from "@/features/chapters/components/edit-chapter-form";
import { useChapter } from "@/features/chapters/queries";

export default function EditChapterPage({
  params: { bookHandle, chapterNumber },
}: {
  params: { bookHandle: string; chapterNumber: number };
}) {
  const { data, isLoading } = useChapter(bookHandle, chapterNumber);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      {isLoading ? <CircularProgress /> : null}

      {data ? (
        <Box sx={{ pb: 7 }} ref={ref}>
          <CssBaseline />
          <EditChapterForm
            chapterId={data.id}
            previousChapterTitle={data.title}
            previousChapterContent={data.content}
          />
        </Box>
      ) : (
        <div>Display an error</div>
      )}
    </>
  );
}
