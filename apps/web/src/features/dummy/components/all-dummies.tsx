import { Card, CircularProgress, Stack, Typography } from "@mui/joy";
import { useAllDummies } from "@/features/dummy/queries";

export const AllDummies = () => {
  const { data, isLoading } = useAllDummies();
  return (
    <Stack spacing={2}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        data?.map((dummy) => (
          <Card key={`${dummy.foo}-${dummy.bar}`}>
            <Typography level="title-md">{dummy.foo}</Typography>
            <Typography level="body-sm">Foo</Typography>
            <Typography level="title-md">{dummy.bar}</Typography>
            <Typography level="body-sm">Bar</Typography>
          </Card>
        ))
      )}
    </Stack>
  );
};
