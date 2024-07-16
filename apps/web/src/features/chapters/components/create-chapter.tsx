"use client";
import { Box, Button } from "@mui/joy";
import { useState } from "react";
import CreateChapterForm from "@/features/chapters/components/create-chapter-form";

export default function CreateChapter({ bookHandle }: { bookHandle: string }) {
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
          bookHandle={bookHandle}
        />
      )}
    </Box>
  );
}
