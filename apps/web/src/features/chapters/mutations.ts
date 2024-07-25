import {
  type UpdateChapterDto,
  type CreateChapterDto,
} from "@bookwave/api-client";
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


export const useUpdateChapterMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      chapterId,
      updatedChapter,
    }: {
      chapterId: string;
      updatedChapter: UpdateChapterDto;
    }) => updateChapter(chapterId, updatedChapter),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ChaptersApiKeys.fetchOne(),
      });
    },
  });
};

async function updateChapter(
  chapterId: string,
  updatedChapter: UpdateChapterDto
) {
  try {
    const response = await apiClient.chapters.updateOne(
      chapterId,
      updatedChapter
    );
    return response;
  } catch (err: unknown) {
    captureAndRethrowException(err);

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
