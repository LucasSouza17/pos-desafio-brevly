import { MyLinksList } from './my-links-list';
import { MyLinksHeader } from './my-links-header';

export function MyLinks() {
  return (
    <div className="flex flex-col min-h-72 lg:h-auto lg:max-h-[80vh] w-full p-8 bg-gray-100 rounded-lg">
      <MyLinksHeader />

      <div className='overflow-y-auto mt-4'>
        <MyLinksList />
      </div>
    </div>
  )
}