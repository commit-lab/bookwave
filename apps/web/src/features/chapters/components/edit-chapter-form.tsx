import { ArrowBack, InfoOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Stack,
  Sheet,
  FormControl,
  Typography,
  FormHelperText,
  Snackbar,
} from "@mui/joy";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { cleanData } from "@bookwave/utils";
import { useGoBack } from "@/shared/routing/hooks/use-go-back";
import { useUpdateChapterMutation } from "@/features/chapters/mutations";
import Editor from "@/features/editor/components/editor";
import ChapterTitleInput from "@/features/chapters/components/chapter-title-input";

const TWO_SECONDS_MS = 2000;

interface EditChapterFormProps {
  chapterId: string;
  previousChapterTitle: string;
  previousChapterContent: string;
}

export interface EditChapterFormFields {
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
    watch,
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

  useEffect(() => {
    const subscription = watch(() => {
      setContentRecentlyChanged(true);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

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
            startDecorator={<ArrowBack />}
            onClick={useGoBack()}
          >
            Back To Chapters
          </Button>{" "}
          <Button
            type="submit"
            disabled={!isValid}
            loading={updateChapterMutation.isPending}
          >
            Save
          </Button>
        </Box>

        <Stack direction="column" alignItems="center" spacing={5}>
          <Sheet variant="plain" sx={{ width: { xs: "80%", sm: "50%" } }}>
            <FormControl error={Boolean(errors.title)}>
              <Typography level="h1">
                <ChapterTitleInput register={register} name="title" />
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
            sx={{
              width: { xs: "80%", sm: "50%" },
              height: "65vh",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                backgroundColor: "transparent",
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgb(11, 107, 203)",
                borderRadius: "6px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "rgb(11, 107, 203)",
              },
            }}
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
