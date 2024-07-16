"use client";

import Link from "next/link";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import { type ChapterDto } from "@bookwave/api-client";
import ChapterOptions from "@/features/chapters/components/chapter-options";

interface ChapterCardProps {
  chapter: ChapterDto;
}

export default function ChapterCard({ chapter }: ChapterCardProps) {
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
          <Link href={`/admin/book/learntocode/${chapter.id}`}>
            <Typography level="body-lg">Chapter 1</Typography>
            <Typography level="h3">{chapter.title}</Typography>
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
