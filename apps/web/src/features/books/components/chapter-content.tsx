import React from "react";
import Link from "next/link";
import { dummyData } from "../dummy-data";

export default function ChapterContent({ id }: { id: string }) {
  const book = dummyData.books[0];
  if (!book) {
    return <div>Book not found</div>;
  }
  const currentChapter = book.chapters.find(
    (chapter) => chapter.id === parseInt(id)
  );

  if (!currentChapter) return <div>Chapter not found</div>;

  return (
    <div>
      <h1>{currentChapter.title}</h1>
      <p>{currentChapter.content}</p>
      <div>
        {currentChapter.id > 1 && (
          <Link href={`/books/${String(currentChapter.id - 1)}`}>
            Previous Chapter
          </Link>
        )}
        {currentChapter.id < book.chapters.length && (
          <Link href={`/books/${String(currentChapter.id + 1)}`}>
            Next Chapter
          </Link>
        )}
      </div>
      <Link href="/books">Back to Table of Contents</Link>
    </div>
  );
}
