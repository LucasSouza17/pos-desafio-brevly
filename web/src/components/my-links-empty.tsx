import { LinkIcon } from "@phosphor-icons/react";

export function MyLinksEmpty() {
  return (
    <div className="flex items-center py-5 justify-center flex-col gap-3 border-t border-gray-200">
      <LinkIcon className="w-8 h-8 text-gray-400" />
      <span className="text-xs text-gray-500">ainda não existem links cadastrados</span>
    </div>
  )
}