import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUrls } from "../http/get-urls";
import { exportUrlsReport } from "../http/export-urls-report";
import { downloadUrl } from "../utils/download-url";

export function MyLinksHeader() {
  const { data: urls } = useQuery({
    queryKey: ['urls'],
    queryFn: getUrls
  })

  const { mutateAsync: exportUrlsReportAsync, isPending: isExporting } = useMutation({
    mutationFn: exportUrlsReport
  })

  async function handleExportUrlsReport() {
    const { reportUrl } = await exportUrlsReportAsync();

    await downloadUrl(reportUrl)
  }

  return (
    <div className="flex justify-between">
      <h2 className="title">Meus Links</h2>
      <Button onClick={handleExportUrlsReport} size="md" variant="secondary" disabled={!urls || urls.length === 0 || isExporting}>
        <DownloadSimpleIcon
          className="mr-2 text-gray-600" />
        {isExporting ? 'Baixando...' : 'Baixar CSV'}
      </Button>
    </div>
  )
}