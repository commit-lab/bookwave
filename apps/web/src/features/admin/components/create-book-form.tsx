import {
  Sheet,
  Stack,
  Input,
  Button,
  FormControl,
  DialogTitle,
} from "@mui/joy";
import { Dialog } from "@mui/material";
import { useForm } from "react-hook-form";
import { useCreateBookMutation } from "@/features/books/mutations";
import { ApiConflictError } from "@/lib/error/api-errors";

interface CreateBookFormFields {
  title: string;
  handle: string;
}

export default function CreateBookForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<CreateBookFormFields>();

  const createBookMutation = useCreateBookMutation();
  const doSubmit = handleSubmit(async (fields) => {
    try {
      await createBookMutation.mutateAsync({
        title: fields.title,
        handle: fields.handle,
      });
    } catch (error) {
      if (error instanceof ApiConflictError) {
        // Handle conflict error on the UI.
      }
    }
  });

  return (
    <Dialog open>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        Create Book
      </DialogTitle>
      <Sheet sx={{ maxWidth: "30rem", p: 8 }}>
        <form onSubmit={doSubmit}>
          <Stack spacing={2}>
            <FormControl error={Boolean(errors.title)}>
              <Input
                {...register("title", { required: "Title is required" })}
                placeholder="Title"
              />
            </FormControl>
            <FormControl>
              <Input
                {...register("handle", {
                  required: "Book handle is required",
                })}
                placeholder="/your-book-handle"
              />
            </FormControl>
            <Button
              type="submit"
              disabled={!isValid}
              loading={createBookMutation.isPending}
            >
              Create Book
            </Button>
          </Stack>
        </form>
      </Sheet>
    </Dialog>
  );
}
