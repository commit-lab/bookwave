import React from "react";
import Link from "next/link";
import { Box, Typography, Sheet } from "@mui/joy";
import { dummyData } from "../dummy-data";

export default function ChapterContent({ id }: { id: string }) {
  // Parse the id to get authorHandle, bookHandle, and chapterNumber
  const [authorHandle, bookHandle, chapterNumber] = id.split("/");

  if (!authorHandle || !bookHandle || !chapterNumber) {
    return <Typography level="h3">Invalid URL</Typography>;
  }

  // Find the correct book
  const book = dummyData.books.find(
    (b) => b.authorHandle === authorHandle && b.bookHandle === bookHandle
  );

  if (!book) {
    return <Typography level="h3">Book not found</Typography>;
  }

  const currentChapter = book.chapters.find(
    (chapter) => chapter.id === parseInt(chapterNumber, 10)
  );

  if (!currentChapter)
    return <Typography level="h3">Chapter not found</Typography>;

  return (
    <Sheet
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        position: "relative",
      }}
    >
      <Typography
        level="h1"
        sx={{ mb: 2, borderBottom: "2px solid", paddingBottom: 2 }}
      >
        {currentChapter.title}
      </Typography>
      <Typography
        sx={{ mb: 4, maxWidth: "800px", textAlign: "center", fontSize: 25 }}
      >
        {currentChapter.content}
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
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {currentChapter.id > 1 && (
          <Link
            href={`/books/${authorHandle}/${bookHandle}/${String(currentChapter.id - 1)}`}
            passHref
          >
            <Typography
              sx={{ textDecoration: "none", cursor: "pointer", fontSize: 25 }}
            >
              &larr; Previous Chapter
            </Typography>
          </Link>
        )}
        <Link href={`/books/${authorHandle}/${bookHandle}/toc`} passHref>
          <Typography
            sx={{ textDecoration: "none", cursor: "pointer", fontSize: 25 }}
          >
            Back to Table of Contents
          </Typography>
        </Link>
        {currentChapter.id < book.chapters.length && (
          <Link
            href={`/books/${authorHandle}/${bookHandle}/${String(currentChapter.id + 1)}`}
            passHref
          >
            <Typography
              sx={{ textDecoration: "none", cursor: "pointer", fontSize: 25 }}
            >
              Next Chapter &rarr;
            </Typography>
          </Link>
        )}
      </Box>
    </Sheet>
  );
}
