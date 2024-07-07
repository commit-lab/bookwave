import { type CreateBookDto } from "@bookwave/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BooksApiKeys } from "@/features/books/queries";
import { apiClient } from "@/lib/api/api-client";
import { captureAndRethrowException } from "@/lib/error/capture-and-rethrow-exception";

export const useCreateBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBook,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: BooksApiKeys.fetchAll(),
      });
    },
  });
};

async function createBook(book: CreateBookDto) {
  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    const response = await apiClient.books.createOne(book);
    return response;
  } catch (error: unknown) {
    captureAndRethrowException(error);
  }
}
