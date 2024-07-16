import { Close } from "@mui/icons-material";
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
import { useCreateChapterMutation } from "@/features/chapters/mutations";
import { ApiConflictError } from "@/lib/error/api-errors";

interface CreateChapterFormFields {
  title: string;
}

interface CreateChapterFormProps {
  handleShowChapterForm: () => void;
  bookId: string | undefined;
}

export default function CreateChapterForm({
  bookId,
  handleShowChapterForm,
}: CreateChapterFormProps) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<CreateChapterFormFields>();
  const createChapterMutation = useCreateChapterMutation(bookId);
  const doSubmit = handleSubmit(async (fields) => {
    try {
      await createChapterMutation.mutateAsync({
        title: fields.title,
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
        <Typography level="h4">Create Chapter</Typography>
        <Close
          onClick={handleShowChapterForm}
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
                placeholder="Chapter Title"
              />
            </FormControl>
            <Button
              type="submit"
              disabled={!isValid}
              loading={createChapterMutation.isPending}
            >
              Create Chapter
            </Button>
          </Stack>
        </form>
      </Sheet>
    </Dialog>
  );
}
