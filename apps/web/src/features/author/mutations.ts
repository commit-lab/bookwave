import {
  type CreateAuthorDto,
  type AuthorDto,
  type DeleteAuthorResponseDto,
} from "@bookwave/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/api-client";
import { captureAndRethrowException } from "@/lib/error/capture-and-rethrow-exception";
import { AuthorApiKeys } from "@/features/author/queries";

export const useCreateAuthorMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAuthor,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: AuthorApiKeys.fetch(),
      });
    },
  });
};

export const useDeleteAuthorMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAuthor,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: AuthorApiKeys.fetch(),
      });
    },
  });
};

async function createAuthor(author: CreateAuthorDto): Promise<AuthorDto> {
  try {
    // Artificial wait so you can see what happens on the UI while the request
    // is in flight.
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    const response = await apiClient.author.create(author);
    return response;
  } catch (err: unknown) {
    captureAndRethrowException(err);
  }
}

async function deleteAuthor(): Promise<DeleteAuthorResponseDto> {
  try {
    // Artificial wait so you can see what happens on the UI while the request
    // is in flight.
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    const response = await apiClient.author.delete();
    return response;
  } catch (err: unknown) {
    captureAndRethrowException(err);
  }
}
