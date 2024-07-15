"use client";

import Link from "next/link";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import { type BookDto } from "@bookwave/api-client";
import BookOptions from "@/features/admin/components/book-options";

interface BookCardProps {
  book: BookDto;
}

export default function BookCard({ book }: BookCardProps) {
  const theme = useTheme();
  return (
    <Card
      key={book.id}
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
          <Link href={`/admin/book/${book.title}`}>
            <Typography level="body-lg">Title</Typography>
            <Typography level="h3">{book.title}</Typography>
          </Link>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography level="body-lg">Chapters</Typography>
          <Typography level="h3">{book.chapterCount}</Typography>
        </Box>
        <Box sx={{ textAlign: "end" }}>
          <Typography level="body-lg">State</Typography>
          <Typography level="h3">{book.state}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <BookOptions bookId={book.id} />
      </CardActions>
    </Card>
  );
}
