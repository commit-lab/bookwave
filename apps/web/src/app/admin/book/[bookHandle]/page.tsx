"use client";

import { Box, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";
import StateSwitch from "@/features/admin/components/state-switch";
import ChapterList from "@/features/chapters/components/chapter-list";
import { useAllChapters } from "@/features/chapters/queries";
import { useIsSignedIn } from "@/features/auth/hooks/use-is-signed-in";

interface ChaptersPageProps {
  bookHandle: string;
}

export default function ChaptersPage({
  params: { bookHandle },
}: {
  params: ChaptersPageProps;
}) {
  const router = useRouter();
  const isSignedIn = useIsSignedIn();

  if (!isSignedIn) {
    router.push("/home");
  }

  const { data } = useAllChapters(bookHandle);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mx: "4rem",
          my: "2rem",
          flex: 1,
        }}
      >
        <Typography level="h2">Chapters</Typography>
        <StateSwitch />
      </Box>

      <ChapterList
        bookHandle={bookHandle}
        bookId={data ? data.id : ""}
        chapterTitles={data?.chapterTitles}
      />
    </Box>
  );
}
