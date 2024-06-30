import { Stack, Typography, Box, Button } from "@mui/joy";
import { type FC } from "react";
import { useSignOut } from "@/features/auth/hooks/use-sign-out";
import { AllDummies } from "@/components/all-dummies";
import { CreateDummy } from "@/components/create-dummy";

export const DummyPageContent: FC = () => {
  const signOut = useSignOut();
  return (
    <Box p={8}>
      <Stack spacing={8} direction={{ xs: "column", md: "row" }}>
        <Stack spacing={4} flex="1">
          <Typography level="h1">Dummy Entries</Typography>
          <AllDummies />
        </Stack>
        <Stack spacing={4} flex="1">
          <Stack direction="row" justifyContent="space-between">
            <Typography level="h1">Create A Dummy</Typography>
            <Button onClick={signOut}>Sign Out</Button>
          </Stack>
          <CreateDummy />
        </Stack>
      </Stack>
    </Box>
  );
};
