import { api } from "./api-client";

interface ExportUrlsReportResponse {
  reportUrl: string
}

export async function exportUrlsReport(): Promise<ExportUrlsReportResponse> {
  const response = await api.get('/urls/report');

  return response.data;
}