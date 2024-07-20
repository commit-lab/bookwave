import { type CreateChapterDto } from "@bookwave/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChaptersApiKeys } from "@/features/chapters/queries";
import { apiClient } from "@/lib/api/api-client";
import { captureAndRethrowException } from "@/lib/error/capture-and-rethrow-exception";

export const useCreateChapterMutation = (bookId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chapter: CreateChapterDto) => createChapter(bookId, chapter),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ChaptersApiKeys.fetchAll(),
      });
    },
  });
};

async function createChapter(bookId: string, chapter: CreateChapterDto) {
  try {
    const response = await apiClient.chapters.createOne(bookId, chapter);
    return response;
  } catch (error: unknown) {
    captureAndRethrowException(error);
  }
}

export const useDeleteChapterMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ chapterId }: { chapterId: string }) =>
      deleteChapter(chapterId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ChaptersApiKeys.fetchAll(),
      });
    },
  });
};

async function deleteChapter(chapterId: string) {
  try {
    const response = await apiClient.chapters.deleteChapter(chapterId);
    return response;
  } catch (error: unknown) {
    captureAndRethrowException(error);
  }
}
