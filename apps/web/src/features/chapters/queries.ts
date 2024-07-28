import { useQuery } from "@tanstack/react-query";
import { type BookWithChapterTitlesDto } from "@bookwave/api-client";
import { apiClient } from "@/lib/api/api-client";
import { captureAndRethrowException } from "@/lib/error/capture-and-rethrow-exception";

enum ChaptersApiEndpoint {
  FetchAll = "ChaptersApiEndpointFetchAll",
  FetchOne = "ChaptersApiEndpointFetchOne",
}

export const ChaptersApiKeys = {
  fetchAll: () => [ChaptersApiEndpoint.FetchAll] as const,
  fetchOne: () => [ChaptersApiEndpoint.FetchOne] as const,
} as const;

export const useAllChapters = (bookHandle: string) => {
  return useQuery({
    queryKey: ChaptersApiKeys.fetchAll(),
    queryFn: () => fetchChapters(bookHandle),
  });
};

export const useChapter = (bookHandle: string, chapterNumber: number) => {
  return useQuery({
    queryKey: ChaptersApiKeys.fetchOne(),
    queryFn: () => fetchOneChapter(bookHandle, chapterNumber),
  });
};

async function fetchChapters(
  bookHandle: string
): Promise<BookWithChapterTitlesDto> {
  try {
    const response = await apiClient.books.getOne(bookHandle);
    return response;
  } catch (error: unknown) {
    captureAndRethrowException(error);
  }
}

async function fetchOneChapter(bookHandle: string, chapterNumber: number) {
  try {
    const response = await apiClient.chapters.getOne(bookHandle, chapterNumber);
    return response;
  } catch (error: unknown) {
    captureAndRethrowException(error);
  }
}
