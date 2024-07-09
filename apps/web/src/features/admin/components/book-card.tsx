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
    <Box key={book.id}>
      <Card
        sx={{
          minWidth: { xs: "100%", sm: 600, md: 800, lg: 1000 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          ":hover": {
            backgroundColor: theme.palette.background.backdrop,
          },
        }}
      >
        <Link href={`/admin/book/${book.title}`}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ textAlign: "start" }}>
              <Typography>Title</Typography>
              <Typography>{book.title}</Typography>
            </Box>
            <Box>
              <Typography>Chapters</Typography>
              <Typography>{book.chapterCount}</Typography>
            </Box>
            <Box>
              <Typography>State</Typography>
              <Typography>{book.state}</Typography>
            </Box>
          </CardContent>
        </Link>
        <CardActions>
          <BookOptions />
        </CardActions>
      </Card>
    </Box>
  );
}
