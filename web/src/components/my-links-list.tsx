import { useQuery } from "@tanstack/react-query"
import { MyLinksItem } from "./my-links-item"
import { getUrls } from "../http/get-urls"

export function MyLinksList() {
  const { data: urls, isLoading } = useQuery({
    queryKey: ['urls'],
    queryFn: getUrls
  })

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (!urls || urls.length === 0) {
    return <p>Você ainda não criou nenhum link.</p>
  }

  return (
    <div className="mt-4 overflow-auto">
      {urls.map(item => (
        <MyLinksItem key={item.id} {...item} />
      ))}
    </div>
  )
}