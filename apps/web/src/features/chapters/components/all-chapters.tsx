import { CircularProgress, Stack, Typography } from "@mui/joy";
import ChapterCard from "@/features/chapters/components/chapter-card";
import { useAllChaptersByBook } from "@/features/chapters/queries";

interface AllChaptersProps {
  bookHandle: string;
}

export default function AllChapters({ bookHandle }: AllChaptersProps) {
  const { data, isLoading } = useAllChaptersByBook(bookHandle);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Stack spacing={2}>
      {data?.length ? (
        data.map((chapter) => (
          <ChapterCard chapter={chapter} key={chapter.id} />
        ))
      ) : (
        <Typography>You don&apos;t have any chapters!</Typography>
      )}
    </Stack>
  );
}
