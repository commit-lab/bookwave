import React from "react";
import Link from "next/link";
import { dummyData } from "../dummy-data";

export default function TableOfContents() {
  const book = dummyData.books[0];
  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <h2>By {book.author}</h2>
      <ul>
        {book.chapters.map((chapter) => (
          <li key={chapter.id}>
            <Link href={`/books/${String(chapter.id)}`}>{chapter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
