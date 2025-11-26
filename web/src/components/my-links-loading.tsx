import { SpinnerIcon } from "@phosphor-icons/react";

export function MyLinksLoading() {
  return (
    <div className="flex items-center py-5 justify-center flex-col gap-3 border-t border-gray-200">
      <SpinnerIcon className="w-8 h-8 text-gray-400 animate-spin" />
      <span className="text-xs text-gray-500">Carregando...</span>
    </div>
  )
}