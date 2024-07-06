import { CircularProgress, Stack } from "@mui/joy";
import { useAllBooks } from "@/features/books/queries";
import BookCard from "@/components/book-card";

export default function AllBooks() {
  const { data, isLoading } = useAllBooks();
  return (
    <Stack spacing={2}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        data?.map((book) => <BookCard book={book} key={book.id} />)
      )}
    </Stack>
  );
}
