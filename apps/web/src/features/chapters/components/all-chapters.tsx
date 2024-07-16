import { CircularProgress, Stack } from "@mui/joy";
import ChapterCard from "@/features/chapters/components/chapter-card";
import { useAllChapters } from "@/features/chapters/queries";

interface AllChaptersProps {
  bookId: string;
}

export default function AllChapters({ bookId }: AllChaptersProps) {
  const { data, isLoading, isError } = useAllChapters(bookId);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <div>Error fetching chapters</div>;
  }

  return (
    <Stack spacing={2}>
      {data?.chapterTitles.length ? (
        data.chapterTitles.map((chapter) => (
          <ChapterCard chapter={chapter} key={chapter} />
        ))
      ) : (
        <div>You don&apos;t have any chapters!</div>
      )}
    </Stack>
  );
}
