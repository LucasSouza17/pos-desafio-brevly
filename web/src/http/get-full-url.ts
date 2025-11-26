import { api } from "./api-client";

interface GetFullUrlResponse {
  fullUrl: string,
}

interface GetFullUrlRequest {
  slug: string,
}

export async function getFullUrl({ slug }: GetFullUrlRequest): Promise<GetFullUrlResponse> {
  const response = await api.get(`/urls/${slug}`);

  return response.data;
}