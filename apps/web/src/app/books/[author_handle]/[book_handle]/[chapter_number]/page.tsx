import { useRouter } from "next/router";
import ChapterContent from "@/features/books/components/chapter-content";

export default function BookChapter() {
  const router = useRouter();
  const { authorHandle, bookHandle, chapterNumber } = router.query;

  if (
    typeof authorHandle !== "string" ||
    typeof bookHandle !== "string" ||
    typeof chapterNumber !== "string"
  ) {
    return <div>Invalid URL parameters</div>;
  }

  const id = `${authorHandle}/${bookHandle}/${chapterNumber}`;

  return <ChapterContent id={id} />;
}
