import { type DummyDto } from "@bookwave/api-client";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/api-client";
import { captureAndRethrowException } from "@/lib/error/capture-and-rethrow-exception";

enum DummyApiEndpoint {
  FetchAll = "DummyApiEndpointFetchAll",
}

export const DummyApiKeys = {
  fetchAll: () => [DummyApiEndpoint.FetchAll] as const,
} as const;

export const useAllDummies = () => {
  return useQuery({
    queryKey: DummyApiKeys.fetchAll(),
    queryFn: fetchDummies,
  });
};

async function fetchDummies(): Promise<DummyDto[]> {
  try {
    const response = await apiClient.dummy.fetchAllDumies();
    return response;
  } catch (err: unknown) {
    captureAndRethrowException(err);
  }
}
