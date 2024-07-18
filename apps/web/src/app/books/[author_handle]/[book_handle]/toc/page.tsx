import TableOfContents from "@/features/books/components/table-of-contents";

export default function BookTableOfContents({
  params,
}: {
  params: { author_handle: string; book_handle: string };
}) {
  // eslint-disable-next-line no-console -- Debugging TOC params
  console.log("BookTableOfContents params:", params);

  return (
    <TableOfContents
      authorHandle={params.author_handle}
      bookHandle={params.book_handle}
    />
  );
}
