"use client";

import { CircularProgress, Stack } from "@mui/joy";
import { useDummy } from "@/features/dummy/queries";
import { UpdateDummyForm } from "@/features/dummy/components/update-dummy";

interface UpdateDummyPageContentProps {
  dummyId: string;
}

const UpdateDummyPageContent = (props: UpdateDummyPageContentProps) => {
  const { dummyId } = props;
  const { data, isLoading } = useDummy(dummyId);

  return (
    <Stack
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <UpdateDummyForm
            dummyId={dummyId}
            previousFoo={data?.foo}
            previousBar={data?.bar}
            previousContent={data?.content}
          />
        </div>
      )}
    </Stack>
  );
};

export default UpdateDummyPageContent;
