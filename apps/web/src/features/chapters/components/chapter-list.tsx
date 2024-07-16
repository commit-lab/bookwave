"use client";

// import { usePathname } from "next/navigation";
import { Box, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import { useAllChaptersByBook } from "@/features/chapters/queries";
import AllChapters from "@/features/chapters/components/all-chapters";
import CreateChapter from "@/features/chapters/components/create-chapter";

export default function ChapterList() {
  // const pathname = usePathname();
  // const bookHandle = pathname.split("/").slice(-1)[0];
  const bookHandle = "book-handle";
  const { data } = useAllChaptersByBook(bookHandle);
  console.log("data", data);
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.body,
        gap: "20px",
        flex: 1,
      }}
    >
      {data?.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
            }}
          >
            You don&apos;t have any chapters!
          </Typography>
          <CreateChapter bookHandle={bookHandle} />
        </Box>
      ) : (
        <>
          <CreateChapter bookHandle={bookHandle} />
          <AllChapters bookHandle={bookHandle} />
        </>
      )}
    </Box>
  );
}
