import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  Sheet,
  Stack,
} from "@mui/joy";
import { useForm } from "react-hook-form";
import { InfoOutlined } from "@mui/icons-material";
import { useCreateDummyMutation } from "@/features/dummy/mutations";
import {
  ApiConflictError,
  ApiNotFoundError,
  ApiUnauthorizedError,
} from "@/lib/error/api-errors";

interface CreateDummyFormFields {
  foo: string;
  bar: string;
}

export const CreateDummy = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<CreateDummyFormFields>({
    defaultValues: {
      foo: "",
      bar: "",
    },
  });
  const createDummyMutation = useCreateDummyMutation();
  const doSubmit = handleSubmit(async (fields) => {
    try {
      await createDummyMutation.mutateAsync({
        foo: fields.foo,
        bar: fields.bar,
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

  return (
    <Sheet sx={{ maxWidth: "30rem", p: 4 }}>
      <form onSubmit={doSubmit}>
        <Stack spacing={2}>
          <FormControl
            disabled={createDummyMutation.isPending}
            error={Boolean(errors.foo)}
          >
            <Input
              {...register("foo", { required: "foo is required" })}
              placeholder="Foo"
            />
            {errors.foo ? (
              <FormHelperText>
                <InfoOutlined /> Foo is required.
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            disabled={createDummyMutation.isPending}
            error={Boolean(errors.bar)}
          >
            <Input
              {...register("bar", { required: "bar is required" })}
              error={Boolean(errors.bar)}
              placeholder="Bar"
            />
            {errors.bar ? (
              <FormHelperText>
                <InfoOutlined /> Bar is required.
              </FormHelperText>
            ) : null}
          </FormControl>
          <Button
            type="submit"
            disabled={!isValid}
            loading={createDummyMutation.isPending}
          >
            Create Dummy
          </Button>
        </Stack>
      </form>
    </Sheet>
  );
};
