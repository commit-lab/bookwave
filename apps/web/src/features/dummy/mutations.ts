import { type UpdateDummyDto, type CreateDummyDto } from "@bookwave/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DummyApiKeys } from "@/features/dummy/queries";
import { apiClient } from "@/lib/api/api-client";
import { captureAndRethrowException } from "@/lib/error/capture-and-rethrow-exception";

export const useCreateDummyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDummy,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DummyApiKeys.fetchAll(),
      });
    },
  });
};

export const useUpdateDummyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      dummyId,
      dummy,
    }: {
      dummyId: string;
      dummy: UpdateDummyDto;
    }) => updateDummy(dummyId, dummy),

    onSuccess: async ({ id }) => {
      await queryClient.invalidateQueries({
        queryKey: DummyApiKeys.fetchOne(id),
      });
    },
  });
};

async function createDummy(dummy: CreateDummyDto) {
  try {
    // Artificial wait so you can see what happens on the UI while the request
    // is in flight.
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    const response = await apiClient.dummy.createOne(dummy);
    return response;
  } catch (err: unknown) {
    captureAndRethrowException(err);
  }
}

async function updateDummy(dummyId: string, dummy: UpdateDummyDto) {
  try {
    // Artificial wait so you can see what happens on the UI while the request
    // is in flight.
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    const response = await apiClient.dummy.updateOne(dummyId, dummy);
    return response;
  } catch (err: unknown) {
    captureAndRethrowException(err);
  }
}
