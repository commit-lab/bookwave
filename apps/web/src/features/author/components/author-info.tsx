import { Card, CircularProgress, Stack, Typography, Button } from "@mui/joy";
import { useAuthorInfo } from "@/features/author/queries";
import { useDeleteAuthorMutation } from "@/features/author/mutations";

export const AuthorInfo = () => {
  const { data, isLoading } = useAuthorInfo();
  const deleteAuthorMutation = useDeleteAuthorMutation();
  const deleteAuthor = async () => {
    await deleteAuthorMutation.mutateAsync();
  };
  if (isLoading) {
    return (
      <Stack>
        <CircularProgress />
      </Stack>
    );
  }

  if (data?.author) {
    return (
      <Stack>
        <Card>
          <Typography level="title-md">{data.author.firstName}</Typography>
          <Typography level="body-sm">First Name</Typography>
          <Typography level="title-md">{data.author.lastName}</Typography>
          <Typography level="body-sm">Last Name</Typography>
          <Typography level="title-md">{data.author.handle}</Typography>
          <Typography level="body-sm">Handle</Typography>
          <Button onClick={deleteAuthor}>Delete</Button>
        </Card>
      </Stack>
    );
  }

  return (
    <Stack>
      <Card key="No Author">
        <Typography level="body-sm">No Author Found</Typography>
      </Card>
    </Stack>
  );
};
