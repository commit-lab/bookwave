import { useRouter } from "next/router";
import TableOfContents from "@/features/books/components/table-of-contents";

export default function BookTableOfContents() {
  const router = useRouter();
  const { authorHandle, bookHandle } = router.query;

  if (typeof authorHandle !== "string" || typeof bookHandle !== "string") {
    return <div>Invalid URL parameters</div>;
  }

  return (
    <TableOfContents authorHandle={authorHandle} bookHandle={bookHandle} />
  );
}
