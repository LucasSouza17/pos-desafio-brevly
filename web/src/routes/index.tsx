import { createFileRoute } from '@tanstack/react-router'
import LogoBrevly from '../../public/logo.svg'
import { MyLinks } from '../components/my-links'
import { NewLink } from '../components/new-link'

export const Route = createFileRoute('/')({
  component: App,
})

export function App() {
  return (
    <div className="w-full mx-auto h-screen max-w-5xl flex items-center justify-center lg:items-start px-3 flex-col gap-6">
      <img src={LogoBrevly} className='h-[24px]' />

      <div className='w-full flex flex-col gap-3 lg:grid lg:grid-cols-5'>
        <div className='lg:col-span-2'>
          <NewLink />
        </div>
        <div className='lg:col-span-3'>
          <MyLinks />
        </div>
      </div>
    </div>
  )
}