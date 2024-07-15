import { useRouter } from "next/router";
import BookOverview from "@/features/books/components/book-overview";

export default function BookPage() {
  const router = useRouter();
  const { authorHandle, bookHandle } = router.query;

  if (typeof authorHandle !== "string" || typeof bookHandle !== "string") {
    return <div>Invalid URL parameters</div>;
  }

  return <BookOverview authorHandle={authorHandle} bookHandle={bookHandle} />;
}
