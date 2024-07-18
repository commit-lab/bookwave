import { Box, CircularProgress } from "@mui/joy";
import { redirect } from "next/navigation";
import { useIsSignedIn } from "@/features/auth/hooks/use-is-signed-in";
import { useAuthStore } from "@/features/auth/stores/auth-store";

export default function InitialLoading() {
  const hasHydrated = useAuthStore((state) => state._hasHydrated);
  const isSignedIn = useIsSignedIn();

  if (!hasHydrated) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isSignedIn) {
    redirect("/home");
  }

  return null;
}
