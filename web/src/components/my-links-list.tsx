import { useQuery } from "@tanstack/react-query"
import { MyLinksItem } from "./my-links-item"
import { getUrls } from "../http/get-urls"
import { MyLinksEmpty } from "./my-links-empty"
import { MyLinksLoading } from "./my-links-loading"

export function MyLinksList() {
  const { data: urls, isLoading } = useQuery({
    queryKey: ['urls'],
    queryFn: getUrls
  })

  if (isLoading) {
    return (
      <div className="mt-4">
        <MyLinksLoading />
      </div>
    )
  }

  if (!urls || urls.length === 0) {
    return (
      <div className="mt-4">
        <MyLinksEmpty />
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {urls.map(item => (
        <MyLinksItem {...item} />
      ))}
    </div>
  )
}