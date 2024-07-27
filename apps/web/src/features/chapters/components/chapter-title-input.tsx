import { Box, Input, Typography } from "@mui/joy";
import Image from "next/image";
import { type UseFormRegister } from "react-hook-form";
import { type EditChapterFormFields } from "@/features/chapters/components/edit-chapter-form";

interface ChapterTitleInputProps {
  name: "content" | "title";
  register: UseFormRegister<EditChapterFormFields>;
}

const ChapterTitleInput = (props: ChapterTitleInputProps) => {
  const { name, register } = props;
  return (
    <Input
      variant="plain"
      size="lg"
      placeholder="Chapter Title"
      startDecorator={
        <Box>
          <Image
            src="/images/app-icon.png"
            alt="App icon"
            height={25}
            width={25}
          />
          <Typography level="h1" sx={{ fontFamily: "Gloria Hallelujah" }}>
            {" "}
            Editing:{" "}
          </Typography>
        </Box>
      }
      {...register(name, {
        required: "Chapter title is required",
        maxLength: 100,
        minLength: 3,
      })}
      sx={{
        fontSize: "45px",
        fontWeight: "700",
        fontFamily: "Gloria Hallelujah",

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
    />
  );
};

export default ChapterTitleInput;
