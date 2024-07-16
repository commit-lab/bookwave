"use client";

import { useState } from "react";
import { Box, Button } from "@mui/joy";
import CreateChapterForm from "@/features/chapters/components/create-chapter-form";

interface CreateChapterProps {
  bookId: string | undefined;
}

export default function CreateChapter({ bookId }: CreateChapterProps) {
  const [showChapterForm, setShowChapterForm] = useState(false);
  const handleShowChapterForm = () => {
    setShowChapterForm((prev) => !prev);
  };

  return (
    <Box>
      {!showChapterForm ? (
        <Button onClick={handleShowChapterForm}>Create Chapter</Button>
      ) : (
        <CreateChapterForm
          handleShowChapterForm={handleShowChapterForm}
          bookId={bookId}
        />
      )}
    </Box>
  );
}
