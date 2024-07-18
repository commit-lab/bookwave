"use client";

import { ArrowBack } from "@mui/icons-material";
import { Box, Button } from "@mui/joy";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { useIsSignedIn } from "@/features/auth/hooks/use-is-signed-in";

interface EditChapterPageProps {
  bookHandle: string;
  chapterNumber: number;
}

export default function EditChapterPage({
  params: { bookHandle, chapterNumber },
}: {
  params: EditChapterPageProps;
}) {
  const router = useRouter();
  const isSignedIn = useIsSignedIn();

  if (!isSignedIn) {
    redirect("/home");
  }
  const handleBackClick = () => {
    router.back();
  };

  // const { data, isLoading, error } = useChapter(bookHandle, chapterNumber);

  return (
    <>
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
        <Button
          variant="plain"
          startDecorator={<ArrowBack />}
          onClick={handleBackClick}
        >
          Back To Chapters
        </Button>{" "}
        <Button>Save</Button>
      </Box>

      <div>{bookHandle}</div>
      <div>{chapterNumber}</div>
      {/* <div>{data?.content}</div> */}
    </>
  );
}
