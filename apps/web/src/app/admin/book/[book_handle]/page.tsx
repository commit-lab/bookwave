import { Box, Typography } from "@mui/joy";
import React from "react";
import StateSwitch from "@/features/admin/components/state-switch";
import ChapterList from "@/features/chapters/components/chapter-list";

export default function Chapters() {
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

      <ChapterList />
    </Box>
  );
}
