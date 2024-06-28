import ChapterContent from "@/features/books/components/chapter-content";

export default function Chapter({ params }: { params: { id: string } }) {
  return <ChapterContent id={params.id} />;
}
