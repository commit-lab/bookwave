import { type DummyDto } from "@bookwave/api-client";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/api-client";
import { captureAndRethrowException } from "@/lib/error/capture-and-rethrow-exception";

enum DummyApiEndpoint {
  FetchAll = "DummyApiEndpointFetchAll",
  FetchOne = "DummyApiEndpointFetchOne",
}

export const DummyApiKeys = {
  fetchAll: () => [DummyApiEndpoint.FetchAll] as const,
  fetchOne: (id: string) => [DummyApiEndpoint.FetchOne, { id }] as const,
} as const;

export const useAllDummies = () => {
  return useQuery({
    queryKey: DummyApiKeys.fetchAll(),
    queryFn: fetchDummies,
  });
};

export const useDummy = (id: string) => {
  return useQuery({
    queryKey: DummyApiKeys.fetchOne(id),
    queryFn: () => fetchDummy(id),
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

async function fetchDummy(dummyId: string): Promise<DummyDto> {
  try {
    const response = await apiClient.dummy.fetchOne(dummyId);
    return response;
  } catch (err: unknown) {
    captureAndRethrowException(err);
  }
}
