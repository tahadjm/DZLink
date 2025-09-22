import type { CitiesResponse, TagsResponse } from "@/types/api";
import { mockCities, mockTags } from "./__mocks__";

export const filtersService = {
  getCities: async (): Promise<CitiesResponse> => {
    return Promise.resolve(mockCities);
  },
  getTags: async (): Promise<TagsResponse> => {
    return Promise.resolve(mockTags);
  },
};
