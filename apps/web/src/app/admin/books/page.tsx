"use client";

import { Box } from "@mui/joy";
import { useRouter } from "next/navigation";
import { useIsSignedIn } from "@/features/auth/hooks/use-is-signed-in";
import BookContent from "@/features/admin/components/book-content";

export default function Books() {
  const router = useRouter();
  const isSignedIn = useIsSignedIn();

  if (!isSignedIn) {
    router.push("/home");
  }

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <BookContent />
    </Box>
  );
}
