"use client";

import { useState } from "react";
import { Box, Button } from "@mui/joy";
import CreateBookForm from "@/features/admin/components/create-book-form";

export default function CreateBook({ formName }: { formName: string }) {
  const [showBookForm, setShowBookForm] = useState(false);
  const handleShowBookForm = () => {
    setShowBookForm((prev) => !prev);
  };

  return (
    <Box>
      {!showBookForm ? (
        <Button onClick={handleShowBookForm}>{formName}</Button>
      ) : (
        <CreateBookForm handleShowBookForm={handleShowBookForm} />
      )}
    </Box>
  );
}
