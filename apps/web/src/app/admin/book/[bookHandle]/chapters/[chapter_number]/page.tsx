"use client";

import { ArrowBack } from "@mui/icons-material";
import { Box, Button } from "@mui/joy";
import { useRouter } from "next/navigation";
import React from "react";

export default function EditChapterPage() {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };

  return (
    <div>
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
      <div>content</div>
    </div>
  );
}
