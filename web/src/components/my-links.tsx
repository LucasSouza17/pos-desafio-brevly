import { DownloadSimple } from '@phosphor-icons/react'
import { MyLinksItem } from "./my-links-item";
import { Button } from "./ui/button";

export function MyLinks() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="flex flex-col w-full p-8 max-h-96 bg-gray-100 rounded-lg lg:max-h-3/4">

      <div className="flex justify-between">
        <h2 className="title">Meus Links</h2>
        <Button size="md" variant="secondary">
          <DownloadSimple className="mr-2 text-gray-600" />
          Baixar CSV
        </Button>
      </div>

      <div className="mt-4 overflow-auto">
        {array.map(item => (
          <MyLinksItem key={item} />
        ))}
      </div>
    </div>
  )
}