"use client";

import Link from "next/link";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import ChapterOptions from "@/features/chapters/components/chapter-options";

interface ChapterCardProps {
  bookHandle: string;
  chapterTitle: string;
  chapterNumber: number;
}
export default function ChapterCard({
  bookHandle,
  chapterTitle,
  chapterNumber,
}: ChapterCardProps) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        minWidth: { xs: "100%", sm: 600, md: 800, lg: 1000 },
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        ":hover": {
          backgroundColor: theme.palette.background.backdrop,
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "start" }}>
          <Link href={`${bookHandle}/chapters/${chapterNumber.toString()}`}>
            <Typography level="body-lg">Chapter {chapterNumber}</Typography>
            <Typography level="h3">{chapterTitle}</Typography>
          </Link>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography level="body-lg">Words</Typography>
          <Typography level="h3">1,222</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <ChapterOptions />
      </CardActions>
    </Card>
  );
}
