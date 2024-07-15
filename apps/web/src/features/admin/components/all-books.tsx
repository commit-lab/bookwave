import { CircularProgress, Stack } from "@mui/joy";
import { useRouter } from "next/navigation";
import { useAllBooks } from "@/features/books/queries";
import BookCard from "@/features/admin/components/book-card";
import { useIsSignedIn } from "@/features/auth/hooks/use-is-signed-in";

export default function AllBooks() {
  const { data, isLoading, isError } = useAllBooks();
  const router = useRouter();
  const isSignedIn = useIsSignedIn();

  if (!isSignedIn) {
    router.push("/home");
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <div>Error fetching books</div>;
  }

  return (
    <Stack spacing={2}>
      {data?.length ? (
        data.map((book) => <BookCard book={book} key={book.id} />)
      ) : (
        <div>You don&apos;t have any books!</div>
      )}
    </Stack>
  );
}
