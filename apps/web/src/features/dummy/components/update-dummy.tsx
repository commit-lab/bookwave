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
import { useEffect, useState } from "react";
import { useUpdateDummyMutation } from "@/features/dummy/mutations";
import {
  ApiConflictError,
  ApiNotFoundError,
  ApiUnauthorizedError,
} from "@/lib/error/api-errors";

const TWO_SECONDS_MS = 2000;

interface UpdateDummyFormFields {
  foo: string;
  bar: string;
  content: string;
}

export interface UpdateDummyFormProps {
  dummyId: string;
  previousFoo: string | undefined;
  previousBar: string | undefined;
  previousContent: string | undefined;
}

export const UpdateDummyForm = (props: UpdateDummyFormProps) => {
  const { dummyId, previousFoo, previousBar, previousContent } = props;
  // Form
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<UpdateDummyFormFields>({
    defaultValues: {
      foo: previousFoo,
      bar: previousBar,
      content: previousContent,
    },
  });

  const [contentRecentlyChanged, setContentRecentlyChanged] =
    useState<boolean>(false);

  const updateDummyMutation = useUpdateDummyMutation();

  const doSubmit = handleSubmit(async (fields) => {
    const dummy = {
      foo: fields.foo,
      bar: fields.bar,
      content: fields.content,
    };
    try {
      await updateDummyMutation.mutateAsync({ dummyId, dummy });
      reset();
    } catch (err: unknown) {
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (contentRecentlyChanged) {
        // auto-save the content while typing
        void doSubmit();
        setContentRecentlyChanged(false);
      }
    }, TWO_SECONDS_MS); // auto-save every 2 seconds
    return () => {
      clearInterval(intervalId);
    }; // Cleanup interval
  });

  return (
    <Sheet
      sx={{
        maxWidth: "30rem",
        p: 4,
      }}
    >
      <form onSubmit={doSubmit}>
        <Stack spacing={2}>
          <FormControl
            disabled={updateDummyMutation.isPending}
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
            disabled={updateDummyMutation.isPending}
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
            loading={updateDummyMutation.isPending}
          >
            Save
          </Button>
        </Stack>
      </form>
    </Sheet>
  );
};
