import { useQuery } from "@tanstack/react-query";
import { type BookWithChapterTitlesDto } from "@bookwave/api-client";
import { apiClient } from "@/lib/api/api-client";
import { captureAndRethrowException } from "@/lib/error/capture-and-rethrow-exception";

enum ChaptersApiEndpoint {
  FetchAllByBook = "ChaptersApiEndpointFetchAll",
}

export const ChaptersApiKeys = {
  fetchAllByBook: (bookHandle: string) =>
    [ChaptersApiEndpoint.FetchAllByBook, bookHandle] as const,
};

export const useAllChaptersByBook = (bookHandle: string) => {
  return useQuery({
    queryKey: ChaptersApiKeys.fetchAllByBook(bookHandle),
    queryFn: () => fetchChaptersByBook(bookHandle),
  });
};

async function fetchChaptersByBook(
  bookHandle: string
): Promise<BookWithChapterTitlesDto> {
  try {
    const response = await apiClient.books.getOne(bookHandle);
    return response;
  } catch (error: unknown) {
    captureAndRethrowException(error);
  }
}
