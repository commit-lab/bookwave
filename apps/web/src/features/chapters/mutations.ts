import { type CreateChapterDto } from "@bookwave/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChaptersApiKeys } from "@/features/chapters/queries";
import { apiClient } from "@/lib/api/api-client";
import { captureAndRethrowException } from "@/lib/error/capture-and-rethrow-exception";

export const useCreateChapterMutation = (bookHandle: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chapter: CreateChapterDto) =>
      createChapter(bookHandle, chapter),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ChaptersApiKeys.fetchAll(),
      });
    },
  });
};

async function createChapter(bookHandle: string, chapter: CreateChapterDto) {
  try {
    const response = await apiClient.chapters.createOne(bookHandle, chapter);
    return response;
  } catch (error: unknown) {
    captureAndRethrowException(error);
  }
}
