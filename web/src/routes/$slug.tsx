import { createFileRoute } from '@tanstack/react-router'
import { Redirect } from '../components/redirect'

export const Route = createFileRoute('/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Redirect />
}
