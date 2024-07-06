import { useQuery } from "@tanstack/react-query";
import { type BookDto } from "@bookwave/api-client";
import { apiClient } from "@/lib/api/api-client";
import { captureAndRethrowException } from "@/lib/error/capture-and-rethrow-exception";

enum BooksApiEndpoint {
  FetchAll = "BooksApiEndpointFetchAll",
}

export const BooksApiKeys = {
  fetchAll: () => [BooksApiEndpoint.FetchAll] as const,
} as const;

export const useAllBooks = () => {
  return useQuery({
    queryKey: BooksApiKeys.fetchAll(),
    queryFn: fetchBooks,
  });
};

async function fetchBooks(): Promise<BookDto[]> {
  try {
    const response = await apiClient.books.getAll();
    return response;
  } catch (error: unknown) {
    captureAndRethrowException(error);
  }
}
