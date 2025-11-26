import { CopyIcon as Copy, SpinnerIcon, TrashIcon as Trash } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { deleteUrl } from "../http/delete-url";
import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "../lib/react-query";
import { useState } from "react";

interface MyLinksItemProps {
  id: string;
  shortUrl: string;
  fullUrl: string;
  entries: number;
}

export function MyLinksItem({ shortUrl, fullUrl, entries }: MyLinksItemProps) {
  const [copyToClipboard, setCopyToClipboard] = useState(false);
  const queryClient = getQueryClient();

  const { mutateAsync: deleteUrlAsync, isPending: isDeleting } = useMutation({
    mutationFn: deleteUrl
  })

  async function handleDeleteUrl() {
    if (confirm("Tem certeza que deseja deletar esse link?")) {
      await deleteUrlAsync({ slug: shortUrl });

      await queryClient.invalidateQueries({ queryKey: ['urls'] });
    }

    return;
  }

  function handleCopyToClipboard() {
    setCopyToClipboard(true);
    navigator.clipboard.writeText(`${import.meta.env.VITE_FRONTEND_URL}/${shortUrl}`);

    setTimeout(() => {
      setCopyToClipboard(false);
    }, 2000);
  }


  return (
    <div className="flex justify-between items-center border-t border-gray-200 py-4 gap-4">
      <div className="flex flex-col gap-1 overflow-hidden">
        <p className="text-md font-semibold truncate text-blue-base">{shortUrl}</p>
        <span className="text-sm text-gray-500 truncate max-w-32 lg:max-w-80">{fullUrl}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">{entries} acessos</span>
        <div className="flex items-center gap-1">
          <Button onClick={handleCopyToClipboard} disabled={copyToClipboard} variant="secondary" size="icon-sm"><Copy className="text-gray-600" weight={copyToClipboard ? "fill" : "regular"} /></Button>
          <Button onClick={handleDeleteUrl} variant="secondary" size="icon-sm" disabled={isDeleting}>
            {isDeleting ? <SpinnerIcon className="animate-spin" /> : <Trash className="text-gray-600" />}
          </Button>
        </div>
      </div>
    </div>
  )
}