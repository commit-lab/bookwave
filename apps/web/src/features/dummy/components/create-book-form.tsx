import { Sheet, Stack, Input, Button, FormControl } from "@mui/joy";

interface CreateBookFormProps {
  handleShowBookForm: () => void;
}

export default function CreateBookForm({
  handleShowBookForm,
}: CreateBookFormProps) {
  return (
    <Sheet sx={{ maxWidth: "30rem", p: 4 }}>
      <form>
        <Stack spacing={2}>
          <FormControl>
            <Input placeholder="Book title" />
          </FormControl>
          <FormControl>
            <Input placeholder="/your-book-handle" />
          </FormControl>
          <Button type="submit">Create Book</Button>
        </Stack>
      </form>
    </Sheet>
  );
}
