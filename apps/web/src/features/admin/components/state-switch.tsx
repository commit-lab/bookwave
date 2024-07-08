"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/joy";
import { ToggleOffOutlined, ToggleOnOutlined } from "@mui/icons-material";

export default function StateSwitch() {
  const [bookState, setBookState] = useState(true);
  const handleStateChange = () => {
    setBookState((prev) => !prev);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <Typography level="h4">Draft</Typography>
      {bookState ? (
        <ToggleOnOutlined onClick={handleStateChange} />
      ) : (
        <ToggleOffOutlined onClick={handleStateChange} />
      )}
      <Typography level="h4">Published</Typography>
    </Box>
  );
}
