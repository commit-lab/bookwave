"use client";

import { Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import { AppBar } from "@mui/material";
import Link from "next/link";

export default function TopBar() {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{ p: 2, backgroundColor: theme.palette.background.backdrop }}
    >
      <Typography
        level="h4"
        sx={{
          cursor: "pointer",
        }}
      >
        <Link href="/">Bookwave</Link>
      </Typography>
    </AppBar>
  );
}
