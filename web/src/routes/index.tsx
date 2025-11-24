import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

export function App() {
  return (
    <div className="p-2">
      <h3 className='text-blue-base text-display-xl'>Welcome Home!</h3>
    </div>
  )
}