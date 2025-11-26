import { MyLinksList } from './my-links-list';
import { MyLinksHeader } from './my-links-header';

export function MyLinks() {
  return (
    <div className="flex flex-col w-full p-8 max-h-96 bg-gray-100 rounded-lg lg:max-h-3/4">
      <MyLinksHeader />
      <MyLinksList />
    </div>
  )
}