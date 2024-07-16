import { useQuery } from "@tanstack/react-query";
import { type BookWithChapterTitlesDto } from "@bookwave/api-client";
import { apiClient } from "@/lib/api/api-client";
import { captureAndRethrowException } from "@/lib/error/capture-and-rethrow-exception";

enum ChaptersApiEndpoint {
  FetchAll = "ChaptersApiEndpointFetchAll",
}

export const ChaptersApiKeys = {
  fetchAll: () => [ChaptersApiEndpoint.FetchAll] as const,
} as const;

export const useAllChapters = (bookId: string) => {
  return useQuery({
    queryKey: ChaptersApiKeys.fetchAll(),
    queryFn: () => fetchChapters(bookId),
  });
};

async function fetchChapters(
  bookId: string
): Promise<BookWithChapterTitlesDto> {
  try {
    const response = await apiClient.books.getOne(bookId);
    return response;
  } catch (error: unknown) {
    captureAndRethrowException(error);
  }
}
