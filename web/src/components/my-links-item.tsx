import { CopyIcon as Copy, TrashIcon as Trash } from "@phosphor-icons/react";
import { Button } from "./ui/button";

interface MyLinksItemProps {
  shortUrl: string;
  fullUrl: string;
  entries: number;
}

export function MyLinksItem({ shortUrl, fullUrl, entries }: MyLinksItemProps) {
  return (
    <div className="flex justify-between items-center border-t border-gray-200 py-4 gap-4">
      <div className="flex flex-col gap-1 overflow-hidden">
        <p className="text-md font-semibold truncate text-blue-base">{shortUrl}</p>
        <span className="text-sm text-gray-500 truncate">{fullUrl}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">{entries} acessos</span>
        <div className="flex items-center gap-1">
          <Button variant="secondary" size="icon-sm"><Copy className="text-gray-600" /></Button>
          <Button variant="secondary" size="icon-sm"><Trash className="text-gray-600" /></Button>
        </div>
      </div>
    </div>
  )
}