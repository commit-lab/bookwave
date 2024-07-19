import {
  Sheet,
  Stack,
  Input,
  FormControl,
  DialogTitle,
  Typography,
  Button,
} from "@mui/joy";
import { Dialog } from "@mui/material";
import { useForm } from "react-hook-form";
import { Close } from "@mui/icons-material";
import { useCreateBookMutation } from "@/features/books/mutations";
import { ApiConflictError } from "@/lib/error/api-errors";

interface CreateBookFormFields {
  title: string;
  handle: string;
}

interface CreateBookFormProps {
  handleShowBookForm: () => void;
}

export default function CreateBookForm({
  handleShowBookForm,
}: CreateBookFormProps) {
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
          p: 2,
        }}
      >
        <Typography level="h4">Create Book</Typography>
        <Close
          onClick={handleShowBookForm}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            cursor: "pointer",
          }}
        />
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
