"use client";

import { Box, Button, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";

export default function SideBar() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "200px",
        height: "100dvh",
        backgroundColor: theme.palette.background.backdrop,
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography>Books</Typography>
        <Typography>Book title</Typography>
      </Box>

      <Button>Your account</Button>
    </Box>
  );
}
