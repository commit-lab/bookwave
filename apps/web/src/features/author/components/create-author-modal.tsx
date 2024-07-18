import {
  Box,
  Button,
  CircularProgress,
  Modal,
  ModalDialog,
  Typography,
  FormControl,
  Stack,
  Input,
  FormHelperText,
} from "@mui/joy";
import { useForm } from "react-hook-form";
import { InfoOutlined } from "@mui/icons-material";
import { useCreateAuthorMutation } from "@/features/author/mutations";
import {
  ApiConflictError,
  ApiNotFoundError,
  ApiUnauthorizedError,
} from "@/lib/error/api-errors";
import { useAuthorInfo } from "@/features/author/queries";

interface CreateAuthorFormFields {
  firstName: string;
  lastName: string;
  handle: string;
}

export const CreateAuthorModal = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<CreateAuthorFormFields>({
    defaultValues: {
      firstName: "",
      lastName: "",
      handle: "",
    },
  });
  const createAuthorMutation = useCreateAuthorMutation();
  const doSubmit = handleSubmit(async (fields) => {
    try {
      await createAuthorMutation.mutateAsync({
        firstName: fields.firstName,
        lastName: fields.lastName,
        handle: fields.handle,
      });
      reset();
    } catch (err: unknown) {
      // Here's how we handle different errors.
      if (err instanceof ApiConflictError) {
        // Handle a conflict error on the UI.
      }
      if (err instanceof ApiNotFoundError) {
        // Handle a not found error on the UI.
      }
      if (err instanceof ApiUnauthorizedError) {
        // Handle an unauthorized error on the UI.
      }
    }
  });

  const { data, isLoading } = useAuthorInfo();
  const authorExists = data?.author;

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (authorExists) {
    return null;
  }

  return (
    <Modal open>
      <ModalDialog>
        <div>
          <Typography level="h4" component="h1" sx={{ textAlign: "center" }}>
            <b>Create Your Account</b>
          </Typography>
          <Typography level="body-sm" sx={{ textAlign: "center" }}>
            Let us know some basic details to get started
          </Typography>
        </div>
        <form onSubmit={doSubmit}>
          <Stack spacing={2}>
            <FormControl
              disabled={createAuthorMutation.isPending}
              error={Boolean(errors.firstName)}
            >
              <Input
                {...register("firstName", {
                  required: "firstName is required",
                })}
                placeholder="First Name"
              />
              {errors.firstName ? (
                <FormHelperText>
                  <InfoOutlined /> First Name is required.
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl
              disabled={createAuthorMutation.isPending}
              error={Boolean(errors.lastName)}
            >
              <Input
                {...register("lastName", { required: "lastName is required" })}
                error={Boolean(errors.lastName)}
                placeholder="Last Name"
              />
              {errors.lastName ? (
                <FormHelperText>
                  <InfoOutlined /> Last Name is required.
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl
              disabled={createAuthorMutation.isPending}
              error={Boolean(errors.handle)}
            >
              <Input
                {...register("handle", { required: "handle is required" })}
                error={Boolean(errors.handle)}
                placeholder="Handle"
              />
              {errors.handle ? (
                <FormHelperText>
                  <InfoOutlined /> Handle is required.
                </FormHelperText>
              ) : null}
            </FormControl>
            <Button
              type="submit"
              disabled={!isValid}
              loading={createAuthorMutation.isPending}
            >
              Create Account
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};
