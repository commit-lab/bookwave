"use client";

import { useParams, useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import { ArrowBack } from "@mui/icons-material";

interface SideBarProps {
  bookTitle: string | undefined;
}

export default function SideBar({ bookTitle }: SideBarProps) {
  const params = useParams();
  const isSpecificRoute = params.bookHandle;
  const theme = useTheme();
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
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
        {isSpecificRoute ? (
          <Button startDecorator={<ArrowBack />} onClick={handleBackClick}>
            Back to Books
          </Button>
        ) : (
          <Typography>Books</Typography>
        )}
        {isSpecificRoute ? <Typography>Book</Typography> : null}
        <Typography level="h4">{bookTitle}</Typography>
      </Box>

      <Button>Your account</Button>
    </Box>
  );
}
