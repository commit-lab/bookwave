"use client";

import Link from "next/link";
import { Box, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import { AppBar } from "@mui/material";
import { Circle, Pentagon, Square } from "@mui/icons-material";

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
          color: theme.palette.primary[500],
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Circle
            sx={{
              color: theme.palette.primary[500],
            }}
          />
          <Link href="/">Bookwave</Link>
        </Box>
      </Typography>
    </AppBar>
  );
}
