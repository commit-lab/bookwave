"use client";

import { useParams, useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import { ArrowBack, Square } from "@mui/icons-material";

interface SideBarProps {
  bookTitle: string | undefined;
}

export default function SideBar({ bookTitle }: SideBarProps) {
  const params = useParams();
  const theme = useTheme();
  const router = useRouter();

  const isSpecificRoute = params.bookHandle;

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
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <Square />
            <Typography level="h4">Books</Typography>
          </Box>
        )}
        {isSpecificRoute ? <Typography level="h4">Book</Typography> : null}
        <Typography
          sx={{
            fontSize: "20px",
            fontStyle: "light",
          }}
        >
          {bookTitle}
        </Typography>
      </Box>

      <Button>Your account</Button>
    </Box>
  );
}
