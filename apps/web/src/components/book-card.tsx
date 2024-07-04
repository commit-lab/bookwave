"ues client";

import Link from "next/link";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import BookOptions from "@/components/book-options";

interface ChapterCardProps {
  book: {
    id: string;
    title: string;
    chapters?: [];
    state: string;
  };
}

export default function BookCard({ book }: ChapterCardProps) {
  const theme = useTheme();
  return (
    <Box key={book.id}>
      <Card
        sx={{
          minWidth: 1000,
          display: "flex",
          flexDirection: "row",
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
              <Typography level="h3">{book.title}</Typography>
            </Box>
            <Box>
              <Typography>Chapters</Typography>
              <Typography level="h4">{book.chapters?.length}</Typography>
            </Box>
            <Box>
              <Typography>State</Typography>
              <Typography level="h4">{book.state}</Typography>
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
