"use client";

import { Box } from "@mui/joy";
import { useRouter } from "next/navigation";
import BookContent from "@/components/book-content";
import Sidebar from "@/components/sidebar";
import { useIsSignedIn } from "@/features/auth/hooks/use-is-signed-in";

export default function Books() {
  const router = useRouter();
  const isSignedIn = useIsSignedIn();

  if (!isSignedIn) {
    router.push("/home");
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <BookContent />
    </Box>
  );
}
