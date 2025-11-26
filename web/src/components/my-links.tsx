import { DownloadSimpleIcon as DownloadSimple } from '@phosphor-icons/react'
import { Button } from "./ui/button";
import { MyLinksList } from './my-links-list';

export function MyLinks() {
  return (
    <div className="flex flex-col w-full p-8 max-h-96 bg-gray-100 rounded-lg lg:max-h-3/4">

      <div className="flex justify-between">
        <h2 className="title">Meus Links</h2>
        <Button size="md" variant="secondary">
          <DownloadSimple className="mr-2 text-gray-600" />
          Baixar CSV
        </Button>
      </div>

      <MyLinksList />
    </div>
  )
}