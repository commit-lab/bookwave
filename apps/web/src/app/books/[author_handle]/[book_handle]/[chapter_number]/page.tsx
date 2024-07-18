import ChapterContent from "@/features/books/components/chapter-content";

export default function BookChapter({
  params,
}: {
  params: {
    author_handle: string;
    book_handle: string;
    chapter_number: string;
  };
}) {
  // eslint-disable-next-line no-console -- Debugging chapter params
  console.log("BookChapter params:", params);

  const id = `${params.author_handle}/${params.book_handle}/${params.chapter_number}`;

  return <ChapterContent id={id} />;
}
