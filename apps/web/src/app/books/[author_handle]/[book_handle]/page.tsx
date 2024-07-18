import BookOverview from "@/features/books/components/book-overview";

export default function BookPage({
  params,
}: {
  params: { author_handle: string; book_handle: string };
}) {
  // eslint-disable-next-line no-console -- Debugging page params
  console.log("BookPage params:", params);

  return (
    <BookOverview
      authorHandle={params.author_handle}
      bookHandle={params.book_handle}
    />
  );
}
