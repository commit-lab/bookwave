"use client";

import { CircularProgress, Stack, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";
import { useDummy } from "@/features/dummy/queries";
import { useIsSignedIn } from "@/features/auth/hooks/use-is-signed-in";

const DummyPage = ({ params: { id } }: { params: { id: string } }) => {
  // const router = useRouter();
  // const isSignedIn = useIsSignedIn();

  // if (!isSignedIn) {
  //   router.push(`/dummy/${id}`);
  // }

  const { data, isLoading } = useDummy(id);
  return (
    <Stack spacing={2}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Typography level="body-sm">{data?.foo}</Typography>
      )}
    </Stack>
  );
};

export default DummyPage;
