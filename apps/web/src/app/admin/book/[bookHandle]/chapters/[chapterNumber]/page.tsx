"use client";

import { CircularProgress } from "@mui/joy";
import React from "react";
import { useChapter } from "@/features/chapters/queries";
import { EditChapterForm } from "@/features/chapters/components/edit-chapter-form";

//THE PAGE
export default function EditChapterPage({
  params: { bookHandle, chapterNumber },
}: {
  params: { bookHandle: string; chapterNumber: number };
}) {
  const { data, isLoading } = useChapter(bookHandle, chapterNumber);

  return (
    <>
      {isLoading ? <CircularProgress /> : null}

      {data ? (
        <EditChapterForm
          chapterId={data.id}
          previousChapterTitle={data.title}
          previousChapterContent={data.content}
        />
      ) : (
        <div>Display an error</div>
      )}
    </>
  );
}
