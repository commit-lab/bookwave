import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Sheet,
  Box,
} from "@mui/joy";
import Link from "next/link";
import { dummyData } from "../dummy-data";

interface TableOfContentsProps {
  authorHandle: string;
  bookHandle: string;
}

export default function TableOfContents({
  authorHandle,
  bookHandle,
}: TableOfContentsProps) {
  // Find the book based on authorHandle and bookHandle
  const book = dummyData.books.find(
    (b) => b.authorHandle === authorHandle && b.bookHandle === bookHandle
  );

  if (!book) {
    return <Typography level="h3">Book not found</Typography>;
  }

  return (
    <Sheet
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        minHeight: "100vh",
        paddingTop: 10,
        px: 10,
      }}
    >
      <div style={{ textAlign: "start", maxWidth: "50%" }}>
        <Typography level="h2" component="h1" sx={{ mb: 2, fontSize: 40 }}>
          {book.title}
        </Typography>
        <Typography sx={{ fontSize: 25 }} level="body-sm">
          By {book.author}
        </Typography>
      </div>

      <List
        aria-labelledby="table-of-contents"
        sx={{
          "--List-decorator-size": "32px",
          "--List-item-paddingLeft": "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          maxWidth: "50%",
          paddingLeft: 3,
          fontSize: 25,
          fontWeight: 500,
        }}
      >
        {book.chapters.map((chapter) => (
          <ListItem key={chapter.id}>
            <Link
              href={`/books/${authorHandle}/${bookHandle}/${String(chapter.id)}`}
              passHref
            >
              <ListItemButton>
                <ListItemContent>{chapter.title}</ListItemContent>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          padding: "10px 20px",
          borderTop: "1px solid #ddd",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <Link href="/books" passHref>
          <Typography
            sx={{ textDecoration: "none", cursor: "pointer", fontSize: 25 }}
          >
            Home
          </Typography>
        </Link>
      </Box>
    </Sheet>
  );
}
