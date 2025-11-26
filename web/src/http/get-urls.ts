import { api } from "./api-client";

interface GetUrlsResponse {
  id: string,
  shortUrl: string,
  fullUrl: string,
  entries: number,
  createdAt: string
}

export async function getUrls(): Promise<GetUrlsResponse[]> {
  const response = await api.get('/urls');

  return response.data;
}