import { Stack, Typography, Box, Button } from "@mui/joy";
import { type FC } from "react";
import { CreateAuthor } from "@/features/author/components/create-author";
import { useSignOut } from "@/features/auth/hooks/use-sign-out";
import { AuthorInfo } from "@/features/author/components/author-info";

export const AuthorPageContent: FC = () => {
  const signOut = useSignOut();
  return (
    <Box p={8}>
      <Stack spacing={8} direction={{ xs: "column", md: "row" }}>
        <Stack spacing={4} flex="1">
          <Typography level="h1">Your Author Info</Typography>
          <AuthorInfo />
        </Stack>
        <Stack spacing={4} flex="1">
          <Stack direction="row" justifyContent="space-between">
            <Typography level="h1">Create An Author</Typography>
            <Button onClick={signOut}>Sign Out</Button>
          </Stack>
          <CreateAuthor />
        </Stack>
      </Stack>
    </Box>
  );
};
