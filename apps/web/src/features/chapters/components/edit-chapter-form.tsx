import { ArrowBack, InfoOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Stack,
  Sheet,
  FormControl,
  Typography,
  Input,
  FormHelperText,
  Snackbar,
} from "@mui/joy";
import DOMPurify from "dompurify";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useGoBack } from "@/shared/routing/hooks/use-go-back";
import { useUpdateChapterMutation } from "@/features/chapters/mutations";
import Editor from "@/features/editor/components/editor";

const TWO_SECONDS_MS = 2000;

interface EditChapterFormProps {
  chapterId: string;
  previousChapterTitle: string;
  previousChapterContent: string;
}

interface EditChapterFormFields {
  title: string;
  content: string;
}

export const EditChapterForm = (props: EditChapterFormProps) => {
  const { chapterId, previousChapterTitle, previousChapterContent } = props;

  const [contentRecentlyChanged, setContentRecentlyChanged] = useState(false);

  const [contentIsValid, setContentIsValid] = useState(true);

  const [errorSnackbarIsOpen, setErrorSnackbarIsOpen] = useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm<EditChapterFormFields>({
    defaultValues: {
      title: previousChapterTitle,
      content: previousChapterContent,
    },
  });

  const updateChapterMutation = useUpdateChapterMutation();
  const doSubmit = handleSubmit(async (fields) => {
    const updatedChapter = {
      title: cleanData(fields.title),
      content: cleanData(fields.content),
    };
    if (!contentIsValid) {
      updatedChapter.content = "";
    }

    try {
      await updateChapterMutation.mutateAsync({ chapterId, updatedChapter });
    } catch (err: unknown) {
      setErrorSnackbarIsOpen(true);
    }
  });

  const cleanData = (htmlContent: string) => {
    return DOMPurify.sanitize(htmlContent);
  };

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
    <>
      <form onSubmit={doSubmit}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: "1rem" },
            mx: { xs: "2rem", sm: "4rem" },
            my: { xs: "1rem", sm: "2rem" },
          }}
        >
          <Button
            variant="plain"
            color="neutral"
            startDecorator={<ArrowBack />}
            onClick={useGoBack()}
          >
            Back To Chapters
          </Button>{" "}
          <Button
            color="neutral"
            type="submit"
            disabled={!isValid}
            loading={updateChapterMutation.isPending}
          >
            Save
          </Button>
        </Box>

        <Stack
          direction="column"
          alignItems="center"
          spacing={5}
          sx={{ width: "100%" }}
        >
          <Sheet variant="plain" sx={{ width: { xs: "80%", sm: "50%" } }}>
            <FormControl
              disabled={updateChapterMutation.isPending}
              error={Boolean(errors.title)}
            >
              <Typography level="h1">
                <Input
                  variant="plain"
                  size="lg"
                  startDecorator={<Typography level="h1">Editing: </Typography>}
                  sx={{
                    fontSize: "45px",
                    fontWeight: "700",
                    "--Input-radius": "0px",
                    borderBottom: "2px solid",
                    borderColor: "neutral.outlinedBorder",
                    "&:hover": {
                      borderColor: "neutral.outlinedHoverBorder",
                    },
                    "&::before": {
                      border: "1px solid var(--Input-focusedHighlight)",
                      transform: "scaleX(0)",
                      left: 0,
                      right: 0,
                      bottom: "-2px",
                      top: "unset",
                      transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                      borderRadius: 0,
                    },
                    "&:focus-within::before": {
                      transform: "scaleX(1)",
                    },
                  }}
                  {...register("title", {
                    required: "Title can't be blank",
                    minLength: 3,
                    maxLength: 100,
                  })}
                  placeholder="Chapter Title"
                />
                {errors.title ? (
                  <FormHelperText>
                    <InfoOutlined /> Title can&apos;t be blank and must be
                    between 3 and 100 characters.
                  </FormHelperText>
                ) : null}
              </Typography>
            </FormControl>
          </Sheet>

          <Sheet
            variant="plain"
            sx={{ minHeight: "30rem", width: { xs: "80%", sm: "50%" } }}
          >
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <Editor
                  content={field.value}
                  onChange={field.onChange}
                  contentRecentlyChanged={contentRecentlyChanged}
                  setContentRecentlyChanged={setContentRecentlyChanged}
                  setContentIsValid={setContentIsValid}
                />
              )}
            />
          </Sheet>
        </Stack>
      </form>
      <Snackbar
        open={errorSnackbarIsOpen}
        onClose={() => {
          setErrorSnackbarIsOpen(false);
        }}
        autoHideDuration={TWO_SECONDS_MS}
        color="danger"
      >
        Your content could not be saved.
      </Snackbar>
    </>
  );
};
