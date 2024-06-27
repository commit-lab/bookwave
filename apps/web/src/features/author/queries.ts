import { type FetchAuthorResponseDto } from "@bookwave/api-client";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/api-client";
import { captureAndRethrowException } from "@/lib/error/capture-and-rethrow-exception";

enum AuthorApiEndpoint {
  Fetch = "AuthorApiEndpointFetch",
}

export const AuthorApiKeys = {
  fetch: () => [AuthorApiEndpoint.Fetch] as const,
} as const;

export const useAuthorInfo = () => {
  return useQuery({
    queryKey: AuthorApiKeys.fetch(),
    queryFn: fetchAuthor,
  });
};

async function fetchAuthor(): Promise<FetchAuthorResponseDto> {
  try {
    const response = await apiClient.author.fetch();
    return response;
  } catch (err: unknown) {
    captureAndRethrowException(err);
  }
}
