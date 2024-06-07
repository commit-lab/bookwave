import { Stack, Typography, Box } from "@mui/joy";
import { type FC } from "react";
import { AllDummies } from "@/features/dummy/components/all-dummies";
import { CreateDummy } from "@/features/dummy/components/create-dummy";

export const DummyPageContent: FC = () => {
  return (
    <Box p={8}>
      <Stack spacing={8} direction={{ xs: "column", md: "row" }}>
        <Stack spacing={4} flex="1">
          <Typography level="h1">Dummy Entries</Typography>
          <AllDummies />
        </Stack>
        <Stack spacing={4} flex="1">
          <Typography level="h1">Create A Dummy</Typography>
          <CreateDummy />
        </Stack>
      </Stack>
    </Box>
  );
};
