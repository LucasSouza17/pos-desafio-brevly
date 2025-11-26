import { createFileRoute } from '@tanstack/react-router'
import { MyLinks } from '../components/my-links'
import { NewLink } from '../components/new-link'

export const Route = createFileRoute('/')({
  component: App,
})

export function App() {
  return (
    <div className="w-screen mx-auto px-3 flex-col h-screen max-w-5xl">
      <div className='w-full flex justify-center lg:justify-start'>
        <img src='logo.svg' className='h-6 mt-6' />
      </div>

      <div className='w-full flex flex-col gap-3 lg:flex-row mt-6'>
        <div className='w-full lg:max-w-[380px]'>
          <NewLink />
        </div>
        <div className='w-full lg:max-w-[580px]'>
          <MyLinks />
        </div>
      </div>
    </div>
  )
}