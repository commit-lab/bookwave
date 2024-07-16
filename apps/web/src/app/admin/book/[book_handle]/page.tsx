"use client";

import { useSearchParams } from "next/navigation";
import { Box, Typography } from "@mui/joy";
import StateSwitch from "@/features/admin/components/state-switch";
import ChapterContent from "@/features/chapters/components/chapter-content";

export default function Chapters() {
  const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId");
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

      <ChapterContent bookId={bookId ?? ""} />
    </Box>
  );
}
