"use client";

import { useState } from "react";
import { Box, Button } from "@mui/joy";
import CreateBookForm from "@/features/dummy/components/create-book-form";

export default function CreateBook() {
  const [showBookForm, setShowBookForm] = useState(false);
  const handleShowBookForm = () => {
    setShowBookForm((prev) => !prev);
  };

  return (
    <Box>
      {!showBookForm ? (
        <Button onClick={handleShowBookForm}>CREATE ONE TO GET STARTED</Button>
      ) : (
        <CreateBookForm handleShowBookForm={handleShowBookForm} />
      )}
    </Box>
  );
}
