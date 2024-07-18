import React from "react";
import { Typography, Sheet, Box } from "@mui/joy";
import Link from "next/link";
import { dummyData } from "../dummy-data";

interface BookOverviewProps {
  authorHandle: string;
  bookHandle: string;
}

export default function BookOverview({
  authorHandle,
  bookHandle,
}: BookOverviewProps) {
  // eslint-disable-next-line no-console -- Debugging book overview params
  console.log("BookOverview params:", { authorHandle, bookHandle });

  const book = dummyData.books.find(
    (b) => b.authorHandle === authorHandle && b.bookHandle === bookHandle
  );

  // eslint-disable-next-line no-console -- Debugging found book
  console.log("Found book:", book);

  if (!book) {
    return <Typography level="h3">Book not found</Typography>;
  }

  return (
    <Sheet
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        paddingTop: 10,
        px: 10,
      }}
    >
      <Typography level="h2" component="h1" sx={{ mb: 2, fontSize: 40 }}>
        {book.title}
      </Typography>
      <Typography sx={{ fontSize: 25, mb: 4 }} level="body-sm">
        By {book.author}
      </Typography>

      <Typography
        level="body-lg"
        sx={{ mb: 4, maxWidth: "600px", textAlign: "center" }}
      >
        This is an overview of the book. You can add a brief description or
        synopsis here.
      </Typography>

      <Link href={`/books/${authorHandle}/${bookHandle}/toc`} passHref>
        <Typography
          sx={{
            textDecoration: "none",
            cursor: "pointer",
            fontSize: 20,
            mb: 2,
          }}
        >
          View Table of Contents
        </Typography>
      </Link>

      <Typography level="body-md" sx={{ mb: 2 }}>
        Number of Chapters: {book.chapters.length}
      </Typography>

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
